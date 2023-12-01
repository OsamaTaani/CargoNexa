// userController.js
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config(); // Load environment variables from .env

const registerUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    user_username: Joi.string().required(),
    user_password: Joi.string().required(),
    user_email: Joi.string().email().required(),
    user_phone_number: Joi.string().required(),
  });

  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user_username, user_password, user_email, user_phone_number } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await UserModel.getUserByEmail(user_email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const newUser = await UserModel.createUser(user_username, user_password, user_email, user_phone_number);

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.user_id, user_email: newUser.user_email , role_id:newUser.role_id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ user: newUser , token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string().required(),
  });

  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user_email, user_password } = req.body;

  try {
    // Verify user credentials
    const user = await UserModel.verifyCredentials(user_email, user_password );
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id, user_email: user.user_email , role_id:user.role_id }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser };
