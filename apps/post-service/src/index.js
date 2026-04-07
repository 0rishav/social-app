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
const WORKER_COUNT = process.env.WEB_CONCURRENCY

console.log("Testing Cache")

const brokerConfig = process.env.KAFKA_BROKERS 
  ? process.env.KAFKA_BROKERS.split(",").map(b => b.trim()) 
  : ["kafka-svc:9092"];

const kafka = new Kafka({
  clientId: "post-service",
  brokers: brokerConfig, 
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
  // 🚀 WORKER SIDE (Smart Hybrid Roles)
  const startWorker = async () => {
    try {
      await connectDB();
      
      const totalWorkers = parseInt(process.env.WEB_CONCURRENCY || "1", 10);
      const workerId = cluster.worker.id;
      
      const isConsumer = totalWorkers === 1 || workerId <= 7;
      const isProducer = totalWorkers === 1 || workerId > 7;

      let producer = null;

      // --- 📥 CONSUMER ROLE ---
      if (isConsumer) {
        console.log(`📥 Consumer Worker ${process.pid} (ID: ${workerId}) Started`);
        await startPostConsumer(kafka).catch((err) =>
          console.error(`❌ Consumer Error:`, err)
        );
      }

      // --- 📡 PRODUCER / API ROLE ---
      if (isProducer) {
        console.log(`📡 Producer/API Worker ${process.pid} (ID: ${workerId}) Started`);
        
        producer = kafka.producer({
          createPartitioner: Partitioners.DefaultPartitioner
        });
        await producer.connect();

        const server = http.createServer(async (req, res) => {
          // Helper methods
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (data) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          };

          // 1. 🏥 CRITICAL: Global Health Check for Startup Probe
          if (req.url === '/health') {
            return res.status(200).json({ success: true, status: "UP" });
          }

          // 2. Body Parsing & Routing
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
              res.status(400).json({ success: false, message: "Invalid JSON or Server Error" });
            }
          });
        });

        const TCP_BACKLOG = 4096; 
        server.listen(PORT, "0.0.0.0", TCP_BACKLOG, () => {
          console.log(`🚀 API Server Worker ${process.pid} Up on PORT:${PORT}`);
        });
      }

    } catch (error) {
      console.error(`Startup Error for Worker ${cluster.worker.id}:`, error.stack);
      process.exit(1);
    }
  };

  startWorker();
}
