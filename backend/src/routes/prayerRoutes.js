const express = require('express');
const { createPrayerRequest } = require('../controllers/prayerController');

const router = express.Router();
router.post('/prayerRequest', createPrayerRequest);

module.exports = router;