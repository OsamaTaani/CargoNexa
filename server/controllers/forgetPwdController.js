
// userController.js

const UserModel = require('../models/forgetPwdModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cargonexa.main@gmail.com', 
    pass: 'ocek tdbr bcoj mqij',
  },
  tls: {
    rejectUnauthorized: false
}

});

const forgotPassword = async (req, res) => {
  const email = req.body.user_email;

  try {
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'Email not found in the database.' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000); 

    const resetCodeExpiry = Date.now() + 600000;

    const checkEmail = await UserModel.setResetCode(email, resetCode, resetCodeExpiry);

    req.session.email = email;

    const mailOptions = {
      from: 'cargonexa.main@gmail.com', 
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


const resetPassword = async (req, res) => {
  const { code, newPassword } = req.body;

  try {
    const email = req.session.email;

    if (!email) {
      return res.status(400).json({ error: 'Invalid or expired reset code. Missing email.' });
    }

    const isValidCode = await UserModel.validateResetCode(email, code);


    if (!isValidCode) {
      return res.status(400).json({ error: 'Invalid or expired reset code.' });
    }

    await UserModel.updatePassword(email, newPassword);
    delete req.session.email;

    await UserModel.expireResetCode(email);

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
            
module.exports = { forgotPassword, resetPassword };
