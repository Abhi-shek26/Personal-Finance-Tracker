const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import the 'path' module
require('dotenv').config();

const transactionRoutes = require('./routes/transaction');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/transactions', transactionRoutes);

// --- DEPLOYMENT CONFIGURATION ---
// This serves the static files from the React app's build directory
const buildPath = path.join(__dirname, '../client/dist');
app.use(express.static(buildPath));

// This handles any requests that don't match the API routes
// by sending back the main index.html file.
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
// --- END DEPLOYMENT CONFIGURATION ---

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
