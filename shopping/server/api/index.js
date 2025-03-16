// api/index.js
import app from '../server.js';
import mongoClient from '../config/mongodb.js';

// Connect to MongoDB
let isConnected = false;

export default async function handler(req, res) {
    if (!isConnected) {
        await mongoClient.connect();
        isConnected = true;
    }

    return app(req, res);
}