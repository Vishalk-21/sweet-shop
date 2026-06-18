/**
 * Main Entry Point
 * Server initialization and middleware setup
 */

const path = require('path');

require('dotenv').config({ path: path.join(__dirname, 'Backend', '.env') });
const app = require('./Backend/src/app');
const connectDB = require('./Backend/src/db/db');

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('✅ Server is running on port', PORT);
  console.log('📝 API available at http://localhost:' + PORT);
  console.log('🔄 Node Environment:', process.env.NODE_ENV || 'development');
});
