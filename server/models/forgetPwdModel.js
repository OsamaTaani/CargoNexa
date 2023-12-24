// userModel.js

const {pool} = require('../db'); // Assuming you have a database connection
const bcrypt = require('bcrypt');

const setResetCode = async (email, resetCode, resetCodeExpiry) => {
    try {
      const formattedExpiry = new Date(resetCodeExpiry).toUTCString();
      
      const result = await pool.query(
        'UPDATE users SET reset_code = $1, reset_code_expiry = $2 WHERE user_email = $3',
        [resetCode, formattedExpiry, email]
      );
  
      if (result.rowCount === 0) {
        throw new Error('User not found.');
      }
    } catch (error) {
      console.error('Error in setResetCode:', error);
      throw error;
    }
  };
  
  const getUserByEmail = async (user_email) => {
    const query = 'SELECT * FROM users WHERE user_email = $1';
    const result = await pool.query(query, [user_email]);
    return result.rows[0];
  };
  
  const validateResetCode = async (email, code) => {
    try {
      const result = await pool.query(
        'SELECT user_email FROM users WHERE user_email = $1 AND reset_code = $2',
        [email, code]
      );
  
      return result.rows.length > 0 ? result.rows[0].user_email : null;
    } catch (error) {
      console.error('Error in validateResetCode:', error);
      throw error;
    }
  };
      
const expireResetCode = async (email) => {
  try {
    await pool.query('UPDATE users SET reset_code = NULL, reset_code_expiry = NULL WHERE user_email = $1', [email]);
  } catch (error) {
    console.error('Error in expireResetToken:', error);
    throw error;
  }
};

const updatePassword = async (email, user_password) => {
  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    await pool.query('UPDATE users SET user_password = $1 WHERE user_email = $2', [hashedPassword, email]);
  } catch (error) {
    console.error('Error in updatePassword:', error);
    throw error;
  }
};

// Add any other necessary methods for your user model

module.exports = { setResetCode, expireResetCode, updatePassword ,validateResetCode , getUserByEmail};
