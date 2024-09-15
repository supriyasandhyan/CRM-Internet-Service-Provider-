// registercontroller.js
const User = require('../Models/AuthModel'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

require('dotenv').config(); 

const SECRET_KEY = process.env.JWT_SECRET || 'jsonwebtoken'; 

// Register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error); // Logging the error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};


// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      console.error('Error logging in user:', error); // Logging the error for debugging
      res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { registerUser , loginUser };
