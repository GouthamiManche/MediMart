const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const sendVerificationEmail = async (user, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Email Verification',
    text: `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

const generateCustomerId = () => {
  return uuid.v4();
};

const generateNumericOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateNumericOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      customerId: generateCustomerId(),
      emailVerificationOtp: otp,
      emailVerificationOtpExpires: otpExpires,
    });
    await newUser.save();
    await sendVerificationEmail(newUser, otp);

    res.status(201).json({ message: 'User registered successfully. Please check your email for verification OTP.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.emailVerificationOtp !== otp || user.emailVerificationOtpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.isEmailVerified = true;
    user.emailVerificationOtp = undefined;
    user.emailVerificationOtpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.Secret_Key, { expiresIn: '3hr' });
  return token;
};

const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({ error: 'Email not verified' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = generateToken(user);
    const decodedToken = jwt.decode(token);
    const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000);

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token,
      expiresIn,
      customerId: user.customerId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports ={registerUser, verifyEmail,loginUser}