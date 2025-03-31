const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const sendEmail = require('../utils/sendEmail');

// Utility function to generate a JWT token for a user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// @desc    User signup with JWT generation
// @route   POST /auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user; password hashing is handled in the User model pre-save hook
    const user = await User.create({ name, email, phone, password });
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    User login with JWT generation
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password using the model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send OTP to user's email for authentication
// @route   POST /auth/otp/send
// @access  Public
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Generate a random 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Calculate OTP expiry time using environment variable (defaults to 10 minutes)
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + parseInt(process.env.OTP_EXPIRY_MINUTES || '10'));
    
    // Remove any previous OTPs for this email
    await OTP.deleteMany({ email });
    
    // Save the new OTP record
    await OTP.create({ email, otp: otpCode, expiresAt: expiry });
    
    // Send OTP via email using the utility function
    await sendEmail(
      email,
      'Your Ride Evee OTP',
      `<h2>Your OTP is: ${otpCode}</h2><p>It will expire in ${process.env.OTP_EXPIRY_MINUTES || '10'} minutes.</p>`
    );
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP for authentication (Signup/Signin)
// @route   POST /auth/otp/verify
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Find the OTP record
    const record = await OTP.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Check if OTP has expired
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }
    
    // OTP is valid; remove it to prevent reuse
    await OTP.deleteMany({ email });
    
    // Check if user exists. If yes, generate a JWT token for immediate signin.
    let user = await User.findOne({ email });
    if (!user) {
      // If user does not exist, inform client to proceed with signup.
      return res.status(200).json({ message: 'OTP verified. Please complete signup.' });
    } else {
      const token = generateToken(user._id);
      return res.status(200).json({ message: 'OTP verified', token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
