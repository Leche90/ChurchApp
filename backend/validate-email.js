const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create reusable transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_SMTP_HOST,  // Use the SMTP host from your .env file
  port: process.env.MAILGUN_SMTP_PORT,  // Use the SMTP port from your .env file
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILGUN_SMTP_USER, // Use the SMTP username from your .env file
    pass: process.env.MAILGUN_SMTP_PASS, // Use the SMTP password from your .env file
  },
});

async function sendEmail() {
  const mailOptions = {
    from: process.env.MAILGUN_FROM_EMAIL,  // This can also be set as your "from" email
    to: 'kingmakerswebapp@gmail.com', // Replace with your email address
    subject: 'Email Validation Test',
    text: 'If you receive this, your Mailgun SMTP setup works!',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendEmail();
