import { model, models, Schema } from "mongoose";

const CommentSchema = Schema(
  {
    progress: {
      type: Schema.Types.Object,
      ref: "progress",
      required: [true, "Progress ID is Required"],
      trim: true,
    },
    user: {
      type: Schema.Types.Object,
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
      type: Number,
      default: 0,
    },
    replies: [
      {
        type: Schema.Types.Object,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

const Comment = models?.comment || model("comment", CommentSchema);

export default Comment;
