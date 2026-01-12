require('dotenv').config();

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

async function sendEmail({ to, subject, text }) {
  try {
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: process.env.MAILGUN_FROM_EMAIL,
      to,
      subject,
      text,
    });
    console.log('Email sent:', data.id);
    return true;
  } catch (error) {
    console.error('Mailgun error:', error.message);
    return false;
  }
}

module.exports = { sendEmail };