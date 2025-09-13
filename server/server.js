const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/User');
require('dotenv').config();

const transactionRoutes = require('./routes/transaction');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173", 
  process.env.FRONTEND_URL 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use('/api/transactions', transactionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Personal Finance Tracker API");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(err => {
  console.log(err);
  process.exit(1);
});
