require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// MongoDB connection setup
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

const app = express();

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true })); // for form submissions

// Serve static files like CSS, images, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Create Mongoose Schema and Model for User
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  securityQuestion: String,
  securityAnswer: String,
});

const User = mongoose.model('User', userSchema);

// Route for displaying the signup form
app.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup.ejs view
});

// Route for handling the signup form submission
app.post('/signup', (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword, securityQuestion, securityAnswer } = req.body;

  // Validate fields
  if (!firstName || !lastName || !email || !phone || !password || !securityQuestion || !securityAnswer) {
    return res.status(400).send('All fields are required');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Check if the email already exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).send('Email is already registered');
      }

      // Hash the password before saving to MongoDB
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).send('Error hashing password');
        }

        // Create a new user document to save to MongoDB
        const newUser = new User({
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          securityQuestion,
          securityAnswer,
        });

        // Save the new user to MongoDB
        newUser.save()
          .then(() => {
            console.log('User Registered:', newUser);
            res.redirect('/login'); // Redirect to login page after successful signup
          })
          .catch((err) => {
            console.log('Error saving user to database:', err);
            res.status(500).send('Error saving user to the database');
          });
      });
    })
    .catch((err) => {
      console.log('Error checking email existence:', err);
      res.status(500).send('Error checking email existence');
    });
});

// Route for displaying the login form
app.get('/login', (req, res) => {
  res.render('login'); // Render the login.ejs view
});

// Route for handling the login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).send('User not found');
      }

      // Compare entered password with hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).send('Error comparing passwords');
        }

        if (isMatch) {
          res.send('Login successful');
        } else {
          res.status(400).send('Invalid credentials');
        }
      });
    })
    .catch((err) => {
      console.log('Error finding user:', err);
      res.status(500).send('Error during login');
    });
});

// Start the server on port 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
