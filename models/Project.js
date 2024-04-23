import { model, models, Schema } from "mongoose";

const MemberSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required to add in the project"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false, timestamps: true }
);

const ProjectSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Project Name is Required"],
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    members: [MemberSchema],
    inviteLink: {
      type: String,
      default: "",
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

const Project = models?.project || model("project", ProjectSchema);

export default Project;
