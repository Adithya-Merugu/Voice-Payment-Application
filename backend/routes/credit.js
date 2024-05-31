const express = require('express');
const router = express.Router();
const Credit = require('../models/Credit');

router.post('/', async (req, res) => {
  try {
    const newCredit = new Credit(req.body);
    const savedCredit = await newCredit.save();
    res.status(201).json(savedCredit);
  } catch (err) {
    console.error(err);  // Log the error
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;
