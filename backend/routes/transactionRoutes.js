const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Route to handle sending money
router.post('/trans', async (req, res) => {
  const { senderPhone, receiverPhone, amount } = req.body;

  try {
    // Find sender and receiver in the database
    const sender = await User.findOne({ phone: senderPhone });
    const receiver = await User.findOne({ phone: receiverPhone });

    // Check if sender and receiver exist
    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: 'Sender or receiver not found.' });
    }

    // Check if sender has sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance.' });
    }

    // Deduct the amount from sender's account
    sender.balance -= amount;
    await sender.save();

    // Add the amount to receiver's account
    receiver.balance += amount;
    await receiver.save();

    // Create a new transaction record
    const newTransaction = new Transaction({
      senderPhone,
      receiverPhone,
      amount
    });

    await newTransaction.save();

    res.status(200).json({ success: true, message: 'Transaction successful.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Transaction failed.', error });
  }
});

module.exports = router;
