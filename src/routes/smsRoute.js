import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing "to" or "message" in request body.' });
  }

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    res.json({ success: true, sid: sms.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
