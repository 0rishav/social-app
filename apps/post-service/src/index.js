import http from "node:http";
import process from "node:process";
import cluster from "node:cluster";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Kafka } from "kafkajs";

// 1. PATH SETUP
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. LOAD .ENV
dotenv.config();
const rootEnvPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: rootEnvPath });

// 3. INTERNAL MODULES
import { connectDB } from "./config/db.js";
import { postRoutes } from "./routes/post.js";
import { ErrorMiddleware } from "../../../packages/common/src/middleware/error.js";
import { updateTrendingTagsCache } from "./utils/cacheWarmer.js";
import { startPostConsumer } from "./utils/postConsumer.js";

const PORT = process.env.POST_PORT || 5001;
const WORKER_COUNT = 14;

console.log("Testing Cache")

const kafka = new Kafka({
  clientId: "post-service",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "post-writes";

if (cluster.isPrimary) {
  console.log(`[MASTER] PID ${process.pid} - Starting Cluster...`);

  const initMaster = async () => {
    try {
      await connectDB();
      console.log("📦 Master: Database Connected");

      const admin = kafka.admin();
      await admin.connect();
      console.log("Kafka Admin Connected...");

      const topics = await admin.listTopics();
      if (!topics.includes(TOPIC_NAME)) {
        await admin.createTopics({
          topics: [
            {
              topic: TOPIC_NAME,
              numPartitions: 14,
              replicationFactor: 1,
            },
          ],
        });
        console.log(`Topic '${TOPIC_NAME}' created with 14 partitions.`);
      } else {
        const metadata = await admin.fetchTopicMetadata({
          topics: ["post-writes"],
        });
        const partitions = metadata.topics[0].partitions;

        console.log("------------------------------------------");
        console.log(`KAFKA TOPIC: post-writes`);
        console.log(`TOTAL PARTITIONS: ${partitions.length}`);
        partitions.forEach((p) => {
          console.log(
            `📍 Partition ID: ${p.partitionId} | Leader: ${p.leader}`,
          );
        });
        console.log("------------------------------------------");
      }
      await admin.disconnect();

      updateTrendingTagsCache();
    } catch (err) {
      console.error("Master Init Error:", err.message);
    }
  };

  initMaster();

  // Fork Workers
  for (let i = 0; i < WORKER_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`⚠️ Worker ${worker.process.pid} died. Reviving...`);
    cluster.fork();
  });
} else {
  // 🚀 WORKER SIDE (Dedicated Roles)
  const startWorker = async () => {
    try {
      await connectDB();
      const isConsumer = cluster.worker.id <= 7;

      if (isConsumer) {
        console.log(
          `📥 Consumer Worker ${process.pid} (ID: ${cluster.worker.id}) Started`,
        );

        await startPostConsumer(kafka).catch((err) =>
          console.error(`❌ Consumer Error:`, err),
        );

      } else {
        console.log(
          `📡 Producer Worker ${process.pid} (ID: ${cluster.worker.id}) Started`,
        );

        const producer = kafka.producer();
        await producer.connect();

        const server = http.createServer(async (req, res) => {
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          };

          let chunks = [];
          req.on("data", (chunk) => chunks.push(chunk));

          req.on("end", async () => {
            try {
              const rawBody = Buffer.concat(chunks);
              req.body = rawBody.length > 0 ? JSON.parse(rawBody) : {};
              req.producer = producer; 

              const routeKey = `${req.method}:${req.url.split("?")[0]}`;
              const handler = postRoutes[routeKey];

              if (handler) {
                await handler(req, res);
              } else {
                res.status(404).json({ success: false, message: "Not Found" });
              }
            } catch (err) {
              res.status(400).json({ success: false, message: "Invalid JSON" });
            }
          });
        });

        const TCP_BACKLOG = 4096; 
        server.listen(PORT, "0.0.0.0", TCP_BACKLOG, () => {
          console.log(`API Server Worker ${process.pid} Up on PORT:${PORT}`);
        });
      }
    } catch (error) {
      console.error(`Startup Error:`, error.stack);
      process.exit(1);
    }
  };

  startWorker();
}
