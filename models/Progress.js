import { model, models, Schema } from "mongoose";

const PogressSchema = Schema(
  {
    project: {
      type: Schema.Types.Object,
      ref: "project",
      required: [true, "Project ID is Required"],
      trim: true,
    },
    user: {
      type: Schema.Types.Object,
      ref: "user",
      required: [true, "Project ID is Required"],
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
    comments: [
      {
        user: {
          type: Schema.Types.Object,
          ref: "user",
        },
        message: {
          type: String,
          required: [true, "Comment is Required"],
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Pogress = models?.pogress || model("pogress", PogressSchema);

export default Pogress;
