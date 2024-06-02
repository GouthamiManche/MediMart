const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/user'); // Adjust the path as per your project structure

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or application-specific password
  },
});

// Endpoint for sending forgot password email
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  
  try {
    // Generate token and save to user in database
    const token = crypto.randomBytes(20).toString('hex');
    const user = await User.findOneAndUpdate({ email }, {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000, // 1 hour
    });

    if (!user) {
      return res.status(404).send('No account with that email address exists.');
    }

    // Compose email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${req.headers.host}/reset/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Password reset email sent.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).send('Error sending password reset email.');
  }
});

module.exports = router;
