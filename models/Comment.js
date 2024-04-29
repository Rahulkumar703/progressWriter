import { model, models, Schema } from "mongoose";

const CommentSchema = Schema(
  {
    progress: {
      type: Schema.Types.ObjectId,
      ref: "progress",
      required: [true, "Progress ID is Required"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is Required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is Required"],
      trim: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      default: null,
    },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: "comment",
      default: [],
    },
  },
  { timestamps: true }
);

const Comment = models?.comment || model("comment", CommentSchema);

export default Comment;
