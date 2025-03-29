const Donation = require('../models/Donation'); // Import the Donation model

// Create a new donation
const createDonation = async (req, res) => {
  try {
    const { donorName, amount, method, message, frequency } = req.body;

    // Validate the input (simple example, can be expanded)
    if (!donorName || !amount || !method) {
      return res.status(400).json({ error: 'Donor name, amount, and method are required' });
    }

    // Create a new donation record
    const donation = new Donation({
      donorName,
      amount,
      method,
      message,
      frequency,
    });

    // Save the donation to the database
    await donation.save();
    res.status(201).json({ message: 'Donation successfully created', donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the donation' });
  }
};

// Get all donations (optional, can be expanded with filtering, pagination, etc.)
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find(); // Retrieve all donations from DB
    res.status(200).json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving donations' });
  }
};

// Get a specific donation by ID
const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id); // Find a donation by its ID
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.status(200).json({ donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the donation' });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
};
