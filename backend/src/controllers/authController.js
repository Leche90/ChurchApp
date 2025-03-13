const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword, securityQuestion, securityAnswer } = req.body;

    // Validate fields
    if (!firstName || !lastName || !email || !phone || !password || !securityQuestion || !securityAnswer) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      securityQuestion,
      securityAnswer,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};