const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String, // e.g., 'credit_card', 'bank_transfer', 'cash', etc.
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    default: '',
  },
  frequency: {
    type: String, // e.g., 'monthly', 'quarterly', 'annually'
    default: 'one-time',
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
