import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    replyId: {
      type: String,
      required: true,
      description: "Unique ID of the reply",
    },
    commentId: {
      type: String,
      required: true,
      description: "ID of the parent comment this reply belongs to",
    },
    authorId: {
      type: String,
      required: true,
      description: "ID of user from Identity Service",
    },
    content: {
      type: String,
      required: true,
      description: "Text content of the reply",
    },
    likesCount: {
      type: Number,
      default: 0,
      description: "Number of likes on this reply",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      description: "Soft delete flag",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: true,
  },
);

replySchema.index({ commentId: 1, createdAt: 1 });
replySchema.index({ authorId: 1, createdAt: -1 });
replySchema.index({ likesCount: -1, createdAt: -1 });
replySchema.index(
  { commentId: 1, authorId: 1, createdAt: 1 },
  { name: "comment_author_createdAt_idx" },
);

const Reply = mongoose.model("Reply", replySchema);
export default Reply;
