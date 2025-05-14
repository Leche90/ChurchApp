const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

// MongoDB client setup using the URI from environment variables
const client = new MongoClient(process.env.MONGO_URI);
const dbName = "churchApp";  // Your actual MongoDB database name

// Mailgun SMTP setup using environment variables
const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USER, // Your Mailgun SMTP username
    pass: process.env.MAILGUN_PASSWORD, // Your Mailgun SMTP password
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only accept POST requests
  }

  try {
    const partnershipData = req.body;

    // Validate required fields
    if (!partnershipData.firstName || !partnershipData.lastName || !partnershipData.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save partnership data to the database
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("partnershipRequests");

    // Insert the partnership data into the MongoDB collection
    await collection.insertOne(partnershipData);

    // Send partnership form data via Mailgun using Nodemailer
    const mailOptions = {
      from: process.env.MAILGUN_FROM_EMAIL,
      to: process.env.MAILGUN_TO_EMAIL,
      subject: 'New Partnership Request',
      text: JSON.stringify(partnershipData, null, 2), // Sending the data as a JSON string
    };

    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Partnership submission error:', error);
    res.status(500).json({ error: 'Failed to submit partnership form' });
  } finally {
    await client.close();  // Ensure the DB connection is closed after the request
  }
}