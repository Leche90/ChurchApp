const express = require('express');
const router = express.Router();
const partnershipController = require('../controllers/partnershipController');

// POST request to handle partnership submission
router.post('/', partnershipController.createPartnershipRequest);

module.exports = router;
