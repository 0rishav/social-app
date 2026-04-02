import cron from "node-cron";
import Post from "../models/postModel.js";
import redisClient from "./redisClient.js";

const updateTrendingTagsCache = async () => {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setDate(twoMonthsAgo.getDate() - 60);

    const pipeline = [
      { $match: { createdAt: { $gte: twoMonthsAgo } } },
      { $project: { _id: 0, tags: 1 } },
      { $match: { "tags.0": { $exists: true } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ];

    const trendingTags = await Post.aggregate(pipeline).allowDiskUse(true);

    await redisClient.set("trending_tags", JSON.stringify(trendingTags));
  } catch (error) {
    console.error("Cron Job Error:", error);
  }
};

cron.schedule("0,30 * * * *", updateTrendingTagsCache);

export { updateTrendingTagsCache };
