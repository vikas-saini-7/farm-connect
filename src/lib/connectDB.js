// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// let cached = global.mongoose || { conn: null, promise: null };

// async function connectDB() {
//   if (cached.conn) return cached.conn; // Return existing connection if available

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Global caching (helps with hot reload in development)
let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔌 Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export default connectDB;
