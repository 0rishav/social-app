import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["title", "heading", "paragraph", "image", "video", "bullets"],
      required: true,
      description: "Defines the type of content block",
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      description: "Actual content of the block: text, array, or media URL",
    },
    order: {
      type: Number,
      required: true,
      description: "Defines the order of this block in the post",
    },
    metadata: {
      type: Object,
      default: {},
      description:
        "Optional metadata per block, e.g., alt text, caption, formatting info",
    },
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
      description:
        "ID of the user who created the post (from Identity Service)",
    },
    blocks: {
      type: [blockSchema],
      required: true,
      description: "Array of content blocks for the post",
    },
    tags: {
      type: [String],
      default: [],
      description: "Optional tags for filtering / discovery",
    },
    visibility: {
      type: String,
      enum: ["public", "connections", "private"],
      default: "public",
      description: "Who can see the post",
    },
    pinned: {
      type: Boolean,
      default: false,
      description: "Whether the post is pinned/featured",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      description: "Soft delete flag for post",
    },
    analytics: {
      likesCount: { type: Number, default: 0 },
      commentsCount: { type: Number, default: 0 },
      sharesCount: { type: Number, default: 0 },
      viewsCount: { type: Number, default: 0 },
      engagementScore: {
        type: Number,
        default: 0,
        description: "Computed weighted score for trending calculation",
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: true,
  },
);

postSchema.index({ authorId: 1, createdAt: -1 });
postSchema.index({ createdAt: -1, tags: 1 });
postSchema.index({ "analytics.engagementScore": -1, createdAt: -1 });

const Post = mongoose.model("Post", postSchema);
export default Post;
