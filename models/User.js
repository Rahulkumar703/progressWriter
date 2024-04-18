import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  // Hash the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});
const User = models?.user || model("user", UserSchema);

export default User;
