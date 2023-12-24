const {pool} = require('../db');

const bcrypt = require('bcrypt');

const addUser = async (user_username, user_password, user_email, user_phone_number) => {
  const role_id = 1;
  const hashedPassword = await bcrypt.hash(user_password, 10); // Hash the password before storing

  const query = 'INSERT INTO users (user_username, user_password, user_email, user_phone_number, role_id) VALUES ($1, $2, $3, $4,$5) RETURNING *';
  const result = await pool.query(query, [user_username, hashedPassword, user_email, user_phone_number , role_id]);
  return result.rows[0];
};

const getUserByEmail = async (user_email) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email]);
    return user.rows[0]; // Assuming you expect only one user with this email
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error;
  }
};



const getAllUsers = async (pageSize , offset , searchTerm) => {
  const users = await pool.query('SELECT *, COUNT(*) OVER () AS total_count FROM users WHERE user_username ILIKE $3 ORDER BY user_id LIMIT $1 OFFSET $2', [pageSize , offset , `%${searchTerm}%`]);
  return users.rows;
};

const getUserById = async (userId) => {
  const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return user.rows[0];
};


const updateUserById = async (userId, username, password, email, phoneNumber) => {
  const updatedUser = await pool.query(
    'UPDATE users SET user_username = $1, user_password = $2, user_email = $3, user_phone_number = $4 WHERE user_id = $5 RETURNING *',
    [username, password, email, phoneNumber, userId]
  );

  return updatedUser.rows[0];
};

const deleteUserById = async (userId) => {
  const deletedUser = await pool.query('UPDATE users SET isdeleted = true WHERE user_id = $1  RETURNING *', [userId]);
  return deletedUser.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addUser,
  getUserByEmail
};
