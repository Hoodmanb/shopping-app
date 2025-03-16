import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import dotenv from 'dotenv';
dotenv.config();

// Ensure MONGODB_URI is set
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

class MongoClient {
  constructor() {
    this.isConnected = false; // Track connection state
  }

  async connect() {
    if (this.isConnected) return; // Prevent duplicate connections

    try {
      await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 30000,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.isConnected = true;
      console.log('✅ MongoDB connected successfully');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1); // Exit process on failure
    }
  }
}

// Export an instance of MongoClient
export default new MongoClient();
