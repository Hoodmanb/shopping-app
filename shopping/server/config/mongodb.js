import dotenv from 'dotenv';
dotenv.config();

// mongoose configuration
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

// MongoDB connection URI for MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;

class MongoClient {
  constructor() {
    this.db = null;
    this.connect();
  }
  
  // method to connect to mongoose if not already conmected
  async connect() {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
  }
}

const mongoClient = new MongoClient();
export default mongoClient;