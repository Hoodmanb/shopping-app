import app from './server.js';
import mongoClient from './config/mongodb.js';

const port = process.env.PORT || 3000;

// Connect to MongoDB
async function startServer() {
    try {
        await mongoClient.connect();
        console.log('Connected to MongoDB');

        // Start the server
        app.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

startServer();