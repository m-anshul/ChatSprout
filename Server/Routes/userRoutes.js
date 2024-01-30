const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userController');

// Route to register a new user
router.post('/register', UserController.registerUser);

// Route to log in an existing user
router.post('/login', UserController.loginUser);

// Add more routes as needed

module.exports = router;