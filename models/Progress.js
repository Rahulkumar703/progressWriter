import { model, models, Schema } from "mongoose";

const PogressSchema = Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
      required: [true, "Project ID is Required"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user ID is Required"],
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
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comment",
    },
  },
  { timestamps: true }
);

const Pogress = models?.pogress || model("pogress", PogressSchema);

export default Pogress;
