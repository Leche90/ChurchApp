const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Route to create a new donation
router.post('/', donationController.createDonation);

// Route to get all donations (optional)
router.get('/', donationController.getAllDonations);

// Route to get a specific donation by ID
router.get('/:id', donationController.getDonationById);

module.exports = router;
