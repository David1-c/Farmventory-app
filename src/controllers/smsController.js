import sendSMS from '../utils/smsUtils.js';

// @desc    Send an SMS message
// @route   POST /api/sms
export const sendSMSMessage = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ message: 'Phone number and message are required' });
    }

    const response = await sendSMS(to, message);

    res.status(200).json({
      success: true,
      message: 'SMS sent successfully',
      response: response
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send SMS', error: error.message });
  }
};
