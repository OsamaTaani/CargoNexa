
// userController.js

const UserModel = require('../models/forgetPwdModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const express = require('express');
const session = require('express-session');
const app = express();

// Add this middleware to your Express app setup
// app.use(session({
//   secret: '065a06f702a2589d98d05d9e7650376371d84f5d3717ea8598293c85dfee85bc', // Replace with a strong secret key
//   resave: false,
//   saveUninitialized: true,
// }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cargonexa.main@gmail.com', // Replace with your Gmail email
    pass: 'ocek tdbr bcoj mqij', // Replace with your Gmail password
  },
});

const forgotPassword = async (req, res) => {
  const email = req.body.user_email;

  try {
    // Check if the email exists in the database
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'Email not found in the database.' });
    }

    // Generate a unique reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

    // Set expiration time for the reset code (e.g., 10 minutes)
    const resetCodeExpiry = Date.now() + 600000;

    // Update the user record with the reset code and expiry
    const checkEmail = await UserModel.setResetCode(email, resetCode, resetCodeExpiry);

    // Save email in the session
    req.session.email = email;

    // Send a reset code to the user
    const mailOptions = {
      from: 'cargonexa.main@gmail.com', // Replace with your Gmail email
      to: email,
      subject: 'Password Reset Request',
      text: `Your password reset code is: ${resetCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset code sent successfully.' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ...

const resetPassword = async (req, res) => {
  const { code, newPassword } = req.body;

  try {
    // Retrieve email from the session
    const email = req.session.email;
    console.log(email);

    if (!email) {
      return res.status(400).json({ error: 'Invalid or expired reset code. Missing email.' });
    }

    // Clear email from the session

    console.log('Reset Password - Email:', email);
    console.log('Reset Password - Code:', code);

    const isValidCode = await UserModel.validateResetCode(email, code);

    console.log('Reset Password - isValidCode:', isValidCode);

    if (!isValidCode) {
      return res.status(400).json({ error: 'Invalid or expired reset code.' });
    }

    // Hash the new password
    // const hashedPassword = await UserModel.hashPassword(newPassword);

    // Update the user's password in the database
    await UserModel.updatePassword(email, newPassword);
    delete req.session.email;

    // Expire or invalidate the reset code
    await UserModel.expireResetCode(email);

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
            
module.exports = { forgotPassword, resetPassword };
