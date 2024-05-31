const mongoose = require("mongoose");

const CreditSchema = new mongoose.Schema(
  {
    Card1: {
      type: String,
      required: true,
      unique: true,
    },
    Card2: {
      type: String,
      required: true,
      unique: true,
    },
    Month: {
      type: String,
      required: true,
      unique: false,
    },
    Year: {
      type: String,
      required: true,
      unique: false,
    },
    Cvv: {
      type: String,
      required: true,
      unique: false,
    },
    Phone: {
      type: String,
      required: true,
      unique: true,
    },
    Balance: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Credit", CreditSchema);
