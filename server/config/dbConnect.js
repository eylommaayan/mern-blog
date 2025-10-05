// server/config/dbConnect.js
import mongoose from "mongoose";

export async function dbConnect() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is undefined – check your .env file!");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    process.exit(1);                // עצור את השרת אם אין DB
  }
}
