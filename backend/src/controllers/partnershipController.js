const PartnershipRequest = require('../models/PartnershipRequest');
const nodemailer = require('nodemailer');

// Mailgun SMTP setup using environment variables
const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USER,  // Your Mailgun SMTP username
    pass: process.env.MAILGUN_PASSWORD,  // Your Mailgun SMTP password
  },
});

const createPartnershipRequest = async (req, res) => {
  try {
    const partnershipData = req.body;

    // Validate required fields
    const { firstName, lastName, email, phone, address, country, supportTypes, donationMethod, donationFrequency, confirmCashDonation, otherSupport, privacyConsent } = partnershipData;

    if (!firstName || !lastName || !email || !phone || !address || !country || !supportTypes || !donationMethod || !donationFrequency || !privacyConsent) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Save to the database
    const partnershipRequest = new PartnershipRequest(partnershipData);
    await partnershipRequest.save();

    // Send email to admin via Mailgun
    const mailOptionsAdmin = {
      from: process.env.MAILGUN_FROM_EMAIL, // Sender address (Mailgun verified email)
      to: process.env.MAILGUN_TO_EMAIL, // Admin email (the recipient)
      subject: 'New Partnership Request',
      text: `New partnership request received from ${firstName} ${lastName}:\n\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nCountry: ${country}\nSupport Types: ${supportTypes.join(', ')}\nDonation Method: ${donationMethod}\nDonation Frequency: ${donationFrequency}\nCash Donation: ${confirmCashDonation ? 'Yes' : 'No'}\nOther Support: ${otherSupport}\nPrivacy Consent: ${privacyConsent ? 'Yes' : 'No'}`,
    };

    await transporter.sendMail(mailOptionsAdmin);

    // Optionally send a confirmation email to the user (if email is provided)
    if (email) {
      const mailOptionsUser = {
        from: process.env.MAILGUN_FROM_EMAIL,
        to: email,
        subject: 'Your Partnership Request Confirmation',
        text: `Dear ${firstName},\n\nThank you for your partnership request. We have received your submission, and our team will get in touch with you soon.\n\nHere are the details we received:\n\n${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nCountry: ${country}\nSupport Types: ${supportTypes.join(', ')}\nDonation Method: ${donationMethod}\nDonation Frequency: ${donationFrequency}\nPrivacy Consent: ${privacyConsent ? 'Yes' : 'No'}`,
      };

      await transporter.sendMail(mailOptionsUser);
    }

    // Send success response
    res.status(200).json({ message: 'Partnership request submitted successfully' });
  } catch (error) {
    console.error('Error in submitting partnership form:', error);
    res.status(500).json({ error: 'Failed to submit partnership form' });
  }
};

module.exports = { createPartnershipRequest };
