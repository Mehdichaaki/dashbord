// routes/userRoutes.js

const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { jwtSecret } = require('../config');
const passwordValidator = require('password-validator');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Define JWT expiration time (e.g., 1 hour)
const jwtExpiration = '1d'; // 'h' for hours, 'd' for days, etc.

const router = express.Router();

// Rate limiting for login requests
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again later'
});

// Password schema for complexity requirements
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits() // Must have digits
    .has().symbols(); // Must have symbols

// Middleware for setting security headers
router.use(helmet());

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field from response
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, grade, year } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email address is already in use' });
        }

        // Create new user instance
        user = new User({ name, email, password, phoneNumber, grade, year });

        // Save user to database
        await user.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle user login
router.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: jwtExpiration });

        // Return token to client
        res.status(200).json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle deleting a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find user by ID and delete
        await User.findByIdAndDelete(id);

        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle updating user information
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber, grade, year } = req.body;

        await User.findByIdAndUpdate(id, { name, email, phoneNumber, grade, year });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Error handling middleware for 404 Not Found errors
router.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware for other errors
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server' });
});

// New route to fetch table data for a specific user
router.get('/users/:userId/table', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch table data for the user (assuming it's stored in a separate collection)
        const tableData = await Table.find({ userId });
        res.json(tableData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
