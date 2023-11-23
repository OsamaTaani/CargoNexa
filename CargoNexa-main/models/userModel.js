// userModel.js
const { pool } = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (user_username, user_password, user_email, user_phone_number) => {
  const role_id = 1;
  const hashedPassword = await bcrypt.hash(user_password, 10); // Hash the password before storing

  const query = 'INSERT INTO users (user_username, user_password, user_email, user_phone_number, role_id) VALUES ($1, $2, $3, $4,$5) RETURNING *';
  const result = await pool.query(query, [user_username, hashedPassword, user_email, user_phone_number , role_id]);
  return result.rows[0];
};

const getUserByEmail = async (user_email) => {
  const query = 'SELECT * FROM users WHERE user_email = $1';
  const result = await pool.query(query, [user_email]);
  return result.rows[0];
};

const verifyCredentials = async (user_email, user_password) => {
  const user = await getUserByEmail(user_email);

  if (!user) {
    return null; // User not found
  }

  const passwordMatch = await bcrypt.compare(user_password, user.user_password);
  return passwordMatch ? user : null;
};

module.exports = { createUser, getUserByEmail, verifyCredentials };
