import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const options = {
      // 🔥 High-Scale Settings
      maxPoolSize: 1000,           
      minPoolSize: 50,             
      socketTimeoutMS: 45000,     
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000,
    };

    const url = await mongoose.connect(process.env.POST_MONGO_URI, options);
    
    console.log(`✅ Database Connected: ${url.connection.host}`);
    console.log(`🚀 Connection Pool: max=${options.maxPoolSize}, min=${options.minPoolSize}`);
    
  } catch (error) {
    console.error("💥 MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};