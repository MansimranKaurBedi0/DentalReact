const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', authController.login);

// @route   PUT /api/auth/update-profile/:id
// @desc    Update user profile (name, email, password)
// @access  Private
router.put('/update-profile/:id', authController.updateProfile);

module.exports = router;
