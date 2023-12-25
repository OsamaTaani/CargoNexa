// userController.js
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config(); // Load environment variables from .env

const registerUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    user_username: Joi.string().pattern(/^[^\s]+$/).required().messages({
      'string.pattern.base': 'Username must not contain spaces.',
    }), // No spaces allowed
    user_password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must be 8-16 characters long and include at least one uppercase letter, one number, and one special character.',
    }), // At least one uppercase, one digit, and one special character
    user_email: Joi.string().pattern(/.*@.*/).required().messages({
      'string.email': 'Email must be valid and contain @.',
    }), // Must contain '@'
    user_phone_number: Joi.string().pattern(/^07\d{8}$/).required().messages({
      'string.pattern.base': 'Phone number must start with 07 and contain a total of 10 digits.',
    }),

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

    user_email: Joi.string().pattern(/.*@.*/).required().messages({
      'string.email': 'Email must be valid and contain @.',
    }), // Must contain '@'

    user_password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must be 8-16 characters long and include at least one uppercase letter, one number, and one special character.',
    }), // At least one uppercase, one digit, and one special character

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
      const orderData = req.body;

      const newOrder = await UserModel.createOrder(userId, orderData);

      res.status(201).json({ message: 'Order created successfully', 
      data: newOrder });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

const  googleLogin = async (req, res) => {
  try {
    // console.log("object");
    const user_username = req.body.name;
    const user_email = req.body.email;

    const { picture } = req.body;
    // console.log(user_email);

    const existUser = await UserModel.getUserByEmail(user_email);
    // console.log(`hhh`, existUser);

    if (existUser) {
      try {
        const payload = {
          user_username: existUser.user_username,
          user_email: existUser.user_email,
          role_id: existUser.role_id,
          user_id: existUser.user_id,
        };
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });

        return res.status(200).json({
          role_id: existUser.role_id,
          logmessage: "User logged in successfully",
          token: token,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      const user = await UserModel.googleAccount({ user_username, user_email, picture });
      console.log(user);
      const payload = {
        user_username: user.user_username,
        user_email: user.user_email,
        role_id: user.role_id,
        user_id: user.user_id,
      };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });

      return res.status(200).json({
        role_id: user.role_id,
        logmessage: "User added successfully",
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
   registerUser,
    loginUser,
    getOrderByUserId,
    getUserOrders,
    createOrder,
    googleLogin
   };
