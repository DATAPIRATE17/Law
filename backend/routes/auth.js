const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/protected', checkAuth, async (req, res) => {
  try {
    const userData = await User.findById(req.userData.userId).select('-password');
    res.json({ message: 'You are authenticated', userData });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
   const { username, email, aadhar, password, phone } = req.body; // Ensure the correct field name
   const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(Number(10));
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, aadhar, password: hashedPassword, phone }); // Ensure the correct field name
    const userDetails = await newUser.save();
    res.status(201).json({ message: 'User created successfully', userDetails });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'No User Found!' });
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid password' });
    
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id }, '4cf173ee0241461f33e64f1c46202c53c3f4fd37366d78dbdf59c0994ba6773a', { expiresIn: '1h' });
      
    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
