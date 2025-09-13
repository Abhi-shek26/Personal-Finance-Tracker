const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User' ,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
