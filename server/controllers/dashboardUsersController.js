const UserModel = require('../models/dashboardUsersModel');
require('dotenv').config();



const Joi = require('joi');

const addUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    user_username: Joi.string().trim().regex(/^\S*$/).required(), // No spaces allowed
    user_password: Joi.string().min(8).max(16).required()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,16}$/), // At least one uppercase, one digit, and one special character
    user_email: Joi.string().email().required().regex(/@/), // Must contain '@'
    user_phone_number: Joi.string().pattern(/^(07\d{8})$/).required(),
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
      return res.status(409).json({ error: "Email is already registered" });
    }

    const newUser = await UserModel.addUser(user_username, user_password, user_email, user_phone_number);

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;

    const users = await UserModel.getAllUsers(pageSize , offset);
    res.status(200).json( users );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);

  try {
    const user = await UserModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update User by ID
const updateUserById = async (req, res) => {
  const userId = req.params.userId;
  const { username, password, email, phoneNumber } = req.body;

  try {
    const updatedUser = await UserModel.updateUserById(userId, username, password, email, phoneNumber);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete User by ID
const deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await UserModel.deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User soft deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addUser,
};
