// userController.js
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config(); // Load environment variables from .env

const registerUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    user_username: Joi.string().trim().regex(/^\S*$/).required(), // No spaces allowed
   
    user_email: Joi.string().email().required().regex(/@/), // Must contain '@'
    user_phone_number: Joi.string().pattern(/^(07\d{8})$/).required(),
    user_password: Joi.string().min(8).max(16).required()
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,16}$/), // At least one uppercase, one digit, and one special character
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

    res.status(201).json({ message:"user created successfully" , token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    user_email: Joi.string()
    .email()
    .regex(/@/) // Ensure the email contains '@'
    .required(),
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

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrderByUserId = async (req, res) => {
  const userId = req.user.userId;
  const orderId = req.params.orderId;

  console.log(userId);

  try {
    const orders = await UserModel.getOrderByUserId(userId , orderId);
    res.json(orders);
  } catch (error) {
    console.error('Error getting orders by user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserOrders = async (req, res) => {
  const  userId  = req.user.userId
  console.log(userId);

  try {
      const orders = await UserModel.getUserOrders(userId);

      res.status(200).json({
          message: 'User orders fetched successfully',
          data: orders,
      });
  } catch (error) {
      console.error('Error in getUserOrders controller:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const createOrder = async (req, res) => {
  try {
      const userId = req.user.userId;
      console.log(userId);
      const orderData = req.body;

      const newOrder = await UserModel.createOrder(userId, orderData);

      res.status(201).json({ message: 'Order created successfully', 
      data: newOrder });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
   registerUser,
    loginUser,
    getOrderByUserId,
    getUserOrders,
    createOrder
   };
