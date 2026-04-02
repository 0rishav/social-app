import {
  createPost,
  getGlobalDiscoveryFeed,
  getTrendingTags,
} from "../controllers/post.js";

export const postRoutes = {
  "GET:/api/v1/post/discovery": getGlobalDiscoveryFeed,
  "GET:/api/v1/post/trending": getTrendingTags,
  "POST:/api/v1/post/create": createPost,
};
