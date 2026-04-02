import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentId: {
      type: String,
      required: true,
      description: "Unique ID of the comment",
    },
    postId: {
      type: String,
      required: true,
      description: "ID of the post this comment belongs to",
    },
    authorId: {
      type: String,
      required: true,
      description: "ID of user from Identity Service",
    },
    content: {
      type: String,
      required: true,
      description: "Text content of the comment",
    },
    likesCount: {
      type: Number,
      default: 0,
      description: "Number of likes on this comment",
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

commentSchema.index({ postId: 1, createdAt: 1 });
commentSchema.index({ authorId: 1, createdAt: -1 });
commentSchema.index({ likesCount: -1, createdAt: -1 });
commentSchema.index(
  { postId: 1, authorId: 1, createdAt: 1 },
  { name: "post_author_createdAt_idx" },
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
