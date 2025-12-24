const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    // Validate request body
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user exists
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) return res.status(400).json({ message: 'Username already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Determine role: If no users exist, this user is admin. Otherwise, student.
    const userCount = await User.countDocuments({});
    const role = userCount === 0 ? 'admin' : 'student';

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        role: role
    });

    try {
        const savedUser = await user.save();
        res.status(201).json({ user: { id: savedUser._id, username: savedUser.username, role: savedUser.role } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    // Check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    // Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid username or password' });

    // Create and assign token
    const token = jwt.sign(
        { id: user._id, role: user.role, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.header('auth-token', token).json({
        token,
        user: {
            id: user._id,
            username: user.username,
            role: user.role
        }
    });
});

module.exports = router;
