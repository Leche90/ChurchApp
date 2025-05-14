const mongoose = require('mongoose');

const partnershipRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  supportTypes: { type: [String], required: true },
  donationMethod: { type: String, required: true },
  donationFrequency: { type: String, required: true },
  confirmCashDonation: { type: Boolean, required: true },
  otherSupport: { type: String, default: '' },
  privacyConsent: { type: Boolean, required: true },
});

const PartnershipRequest = mongoose.model('PartnershipRequest', partnershipRequestSchema);

module.exports = PartnershipRequest;
