import {
  createPost,
  getGlobalDiscoveryFeed,
  getTrendingTags,
} from "../controllers/post.js";

export const postRoutes = {
  "GET:/health": (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "UP", service: "post-service" }));
  },
  "GET:/api/v1/post/discovery": getGlobalDiscoveryFeed,
  "GET:/api/v1/post/trending": getTrendingTags,
  "POST:/api/v1/post/create": createPost,
};
