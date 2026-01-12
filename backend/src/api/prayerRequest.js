import mailgun from 'mailgun-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Verify environment variables
  const requiredVars = ['MAILGUN_API_KEY', 'MAILGUN_DOMAIN', 'MAILGUN_FROM_EMAIL', 'MAILGUN_TO_EMAIL'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars);
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: `Missing: ${missingVars.join(', ')}`
    });
  }

  const { name, request, email } = req.body;

  // Validate input
  if (!request) {
    return res.status(400).json({ error: 'Prayer request is required' });
  }

  try {
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      host: 'api.mailgun.net' // Explicitly set the API host
    });

    // Verify your admin email is authorized in Mailgun sandbox
    const adminEmail = process.env.MAILGUN_TO_EMAIL;

    // Email to admin
    const adminEmailData = {
      from: process.env.MAILGUN_FROM_EMAIL,
      to: adminEmail,
      subject: `New Prayer Request from ${name || 'Anonymous'}`,
      text: `Prayer Request Details:\n\nName: ${name || 'Anonymous'}\nEmail: ${email || 'Not provided'}\n\nRequest:\n${request}`
    };

    await mg.messages().send(adminEmailData);
    console.log('Prayer request email sent to admin');

    // Optional confirmation email to user
    if (email) {
      const userEmailData = {
        from: process.env.MAILGUN_FROM_EMAIL,
        to: email,
        subject: 'Your Prayer Request Has Been Received',
        text: `Dear ${name || 'Friend'},\n\nThank you for submitting your prayer request:\n\n"${request}"\n\nOur team will be praying for you.\n\nBlessings,\nYour Church Team`
      };

      await mg.messages().send(userEmailData);
      console.log('Confirmation email sent to user');
    }

    return res.status(200).json({ message: 'Prayer request submitted successfully' });
  } catch (error) {
    console.error('Full Mailgun error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.body,
      config: {
        domain: process.env.MAILGUN_DOMAIN,
        apiKey: process.env.MAILGUN_API_KEY ? '***' : 'MISSING'
      }
    });

    return res.status(500).json({ 
      error: 'Failed to submit prayer request',
      details: error.message,
      suggestion: 'Please try again later or contact support'
    });
  }
}