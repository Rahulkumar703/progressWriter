import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("MONGO_URI is not defined.");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

export const dbConnect = async () => {
  if (cached.conn) return cached.conn;
  console.log("db Connection established");
  cached.conn = await mongoose.connect(MONGO_URI);

  return cached.conn;
};
