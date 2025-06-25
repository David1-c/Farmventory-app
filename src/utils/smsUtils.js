import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: to
    });

    console.log('SMS sent successfully:', response.sid);
    return {
      status: 'Sent',
      sid: response.sid,
      to: to,
      message: message
    };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return {
      status: 'Failed',
      error: error.message,
      to: to,
      message: message
    };
  }
};
