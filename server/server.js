const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const transactionRoutes = require('./routes/transaction');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

const buildPath = path.join(__dirname, '../dist');
app.use(express.static(buildPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
