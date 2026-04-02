import axios from "axios";
import Post from "../models/postModel.js";
import redisClient from "../utils/redisClient.js";
import { HTTP_STATUS } from "../../../../packages/common/src/constants/httpStatus.js";
import { CatchAsyncError } from "../../../../packages/common/src/middleware/CatchAsyncError.js";

import { BSON } from 'bson';
import { Kafka, Partitioners } from 'kafkajs';


const kafka = new Kafka({ brokers: ['localhost:9092'] });
const producer = kafka.producer({createPartitioner: Partitioners.DefaultPartitioner});
await producer.connect();

const sendResponse = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(typeof data === "string" ? data : JSON.stringify(data));
};

let l1CacheBuffer = null; 
let l1Expiry = 0;
const L1_TTL = 5000; 

let isFetching = false;

export const getGlobalDiscoveryFeed = CatchAsyncError(async (req, res, next) => {
  const now = Date.now();

  if (l1CacheBuffer && now < l1Expiry) {
    res.setHeader("Content-Type", "application/json");
    return res.end(l1CacheBuffer); 
  }

  const CACHE_KEY = "global_discovery_feed_bin";

  const cached = await redisClient.sendCommand(['GET', CACHE_KEY], { returnBuffers: true });

  if (cached) {
    l1CacheBuffer = cached;
    l1Expiry = now + L1_TTL;
    res.setHeader("Content-Type", "application/json");
    return res.end(cached);
  }

  if (isFetching) {
    if (l1CacheBuffer) {
      res.setHeader("Content-Type", "application/json");
      return res.end(l1CacheBuffer);
    }
  }

  isFetching = true;

  try {
    const posts = await Post.find({ isDeleted: false, visibility: "public" })
      .sort({ "analytics.engagementScore": -1, createdAt: -1 })
      .limit(20)
      .select("authorId blocks tags analytics createdAt")
      .lean();

    const authorIds = [...new Set(posts.map((p) => p.authorId))];
    let authorsMap = {};

    try {
      const response = await axios.post(
        `${process.env.IDENTITY_SERVICE_URL}/api/v1/auth/internal/users-batch`,
        { userIds: authorIds },
        { 
          timeout: 2000, 
          headers: { 
            "Content-Type": "application/json",
            "x-internal-secret": process.env.INTERNAL_SERVICE_SECRET 
          } 
        }
      );
      (response.data.data || []).forEach(u => authorsMap[u._id] = u);
    } catch (err) {}

    const finalBuffer = Buffer.from(JSON.stringify({
      success: true,
      data: posts.map(p => ({ ...p, author: authorsMap[p.authorId] || null }))
    }));

    await redisClient.set(CACHE_KEY, finalBuffer, { EX: 10 });
    l1CacheBuffer = finalBuffer;
    l1Expiry = now + L1_TTL;

    res.setHeader("Content-Type", "application/json");
    res.end(finalBuffer);
  } finally {
    isFetching = false;
  }
});

export const getTrendingTags = CatchAsyncError(async (req, res, next) => {
  const cachedData = await redisClient.get("trending_tags");

  if (cachedData) {
    return sendResponse(
      res,
      HTTP_STATUS.OK,
      "Trending tags fetched successfully",
      JSON.parse(cachedData),
    );
  }

  return sendResponse(
    res,
    HTTP_STATUS.ACCEPTED,
    "Cache is warming up, please try again in a moment",
  );
});

export const createPost = async (req, res) => {
    try {
        const { authorId, blocks, tags, visibility } = req.body;

        // Fast Validation (Bina DB query ke)
        if (!authorId || !blocks || blocks.length === 0) {
            return res.status(400).json({ error: "Invalid Post Data" });
        }

        // Payload for Kafka
        const payload = {
            authorId,
            blocks,
            tags: tags || [],
            visibility: visibility || 'public',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const binaryBuffer = BSON.serialize(payload);

        // Partition Strategy: authorId ke hisaab se partition select hoga 
        // taaki ek user ke posts ek hi partition mein rahein (Ordering maintain rahegi)
        await producer.send({
            topic: 'post-writes',
            messages: [{ 
                key: authorId, 
                value: binaryBuffer 
            }]
        });

        res.status(202).json({ success: true, message: "Post creation initiated" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// export const getTrendingTags = async (req, res) => {
//   const cacheKey = "trending_tags";
//   console.time("API_Response_Time");

//   try {
//     const cachedData = await redisClient.get(cacheKey);

//     if (cachedData) {
//       console.timeEnd("API_Response_Time");
//       return res.status(200).json({
//         success: true,
//         data: JSON.parse(cachedData),
//         source: "cache_always"
//       });
//     }

//     // Agar cache khali hai (Server restart pe), toh turant manual update trigger karo
//     // Lekin billion scale pe ye case sirf ek baar aayega
//     return res.status(200).json({
//       success: false,
//       message: "Cache warming in progress, try again in 2 seconds."
//     });

//   } catch (error) {
//     console.timeEnd("API_Response_Time");
//     res.status(500).json({ success: false });
//   }
// };
