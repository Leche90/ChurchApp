const PrayerRequest = require('../models/PrayerRequest');
const { sendEmail } = require('../services/emailService');

async function createPrayerRequest(req, res) {
  try {
    const { name, request, email } = req.body;

    if (!request) {
      return res.status(400).json({ error: 'Prayer request text is required' });
    }

    const prayerRequest = await PrayerRequest.create({
      name: name || 'Anonymous',
      request,
      email: email || undefined,
    });

    if (process.env.MAILGUN_API_KEY) {
      // Admin notification
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Prayer Request from ${name || 'Anonymous'}`,
        text: `Request: ${request}\nFrom: ${name || 'Anonymous'}${email ? ` (${email})` : ''}`
      }).catch(e => console.error('Admin email failed:', e));

      // User confirmation
      if (email) {
        sendEmail({
          to: email,
          subject: 'Your Prayer Request Confirmation',
          text: `Dear ${name || 'Friend'},\n\nWe've received your prayer request:\n\n"${request}"`
        }).catch(e => console.error('User email failed:', e));
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Prayer request submitted successfully',
      requestId: prayerRequest._id,
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Failed to process prayer request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

module.exports = { createPrayerRequest };