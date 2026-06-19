/**
 * Main Entry Point
 * Server initialization and middleware setup
 */

const path = require('path');

require('dotenv').config({ path: path.join(__dirname, 'Backend', '.env') });
const app = require('./Backend/src/app');
const connectDB = require('./Backend/src/db/db');

const retryMongoConnection = async () => {
  const connected = await connectDB();

  if (!connected) {
    const retryMs = 10000;
    console.warn(`MongoDB not connected. Retrying in ${retryMs / 1000} seconds...`);
    setTimeout(retryMongoConnection, retryMs);
  }
};

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('✅ Server is running on port', PORT);
  console.log('📝 API available at http://localhost:' + PORT);
  console.log('🔄 Node Environment:', process.env.NODE_ENV || 'development');
});

// Connect to database after the server starts so healthchecks can respond.
if (process.env.MONGO_URI || process.env.MONGODB_URI) {
  retryMongoConnection();
} else {
  console.error('MongoDB connection skipped. Set MONGO_URI or MONGODB_URI.');
}
