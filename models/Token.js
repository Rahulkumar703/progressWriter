import { model, models, Schema } from "mongoose";

const TokenSchema = Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required who is generating the token"],
    },
  },
  { timestamps: true }
);

const Token = models?.token || model("token", TokenSchema);

export default Token;
