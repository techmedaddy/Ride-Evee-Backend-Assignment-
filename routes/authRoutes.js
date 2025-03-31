const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  sendOTP,
  verifyOTP,
} = require('../controllers/authController');

// @route POST /auth/signup
router.post('/signup', signup);

// @route POST /auth/login
router.post('/login', login);

// @route POST /auth/otp/send
router.post('/otp/send', sendOTP);

// @route POST /auth/otp/verify
router.post('/otp/verify', verifyOTP);

module.exports = router;
