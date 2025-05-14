const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  request: { type: String, required: true },
  email: { type: String, default: '' },
  date: { type: Date, default: Date.now },
});

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

module.exports = PrayerRequest;
