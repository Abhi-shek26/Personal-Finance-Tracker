const express = require('express');
const router = require('express').Router();
const Transaction = require('../models/Transaction');
const requireAuth = require('../middleware/auth');

router.use(requireAuth);

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching transaction' });
    }
});

router.post('/', async (req, res) => {
    const { title, amount, date, category, description, type } = req.body;
    try {
        const transaction = await Transaction.create({ title, amount, date, category, user: req.user._id });
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', requireAuth, async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true, runValidators: true });
        if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const transaction = await Transaction.findOneAndDelete({ _id: id, user: req.user._id });
    if (!transaction) {
        return res.status(404).json({ error: 'No such transaction found' });
    }
    return res.status(200).json({ message: 'Transaction deleted', transaction });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
