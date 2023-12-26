const {pool} = require('../db');
const bcrypt = require('bcrypt');
const getUserById = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const updateUserProfile = async (userId, updatedInfo) => {
    console.log("userinfo" , updatedInfo);
    try {
      const { user_username, user_email, user_phone_number ,user_image} = updatedInfo;
  
      const result = await pool.query(
        'UPDATE users SET user_username = $1, user_email = $2, user_phone_number = $3 , user_image = $4 WHERE user_id = $5  RETURNING *',
        [user_username, user_email, user_phone_number,user_image, userId]
      );
      console.log("Query:", 'UPDATE users SET user_username = $1, user_email = $2, user_phone_number = $3 , user_image = $4 WHERE user_id = $5  RETURNING *', [user_username, user_email, user_phone_number, user_image, userId]);

      console.log("bbb",result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  async function updateOrder(userId, orderId, updatedOrderData) {
    const {
      name,
      receiver_name,
      receiving_timestamp,
      shipping_timestamp,
      order_description,
      order_phone_number,
      receiver_phone_number,
      message,
      order_title,
      /* Add other fields you want to update */
    } = updatedOrderData;
  
    try {
      const result = await pool.query(
        `UPDATE orders
         SET
           name = $2,
           receiver_name = $3,
           receiving_timestamp = $4,
           shipping_timestamp = $5,
           order_description = $6,
           order_phone_number = $7,
           receiver_phone_number = $8,
           message = $9,
           order_title = $10
         WHERE order_id = $1 AND user_id = $11
         RETURNING *`,
        [
          orderId,
          name,
          receiver_name,
          receiving_timestamp,
          shipping_timestamp,
          order_description,
          order_phone_number,
          receiver_phone_number,
          message,
          order_title,
          userId,
        ]
      );
  
      if (result.rows.length === 0) {
        throw new Error('Order not found for the specified user');
      }
  
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
    

  const deleteOrder = async (orderId) => {
    const deletedOrder = await pool.query('UPDATE orders SET isDeleted = true WHERE order_id = $1 RETURNING *', [orderId]);
    return deletedOrder.rows[0];
  };

  
  const validatePassword = async (userId, currentPassword) => {
    const result = await pool.query('SELECT user_password FROM users WHERE user_id = $1', [userId]);
    const storedPassword = result.rows[0].user_password;

    return await bcrypt.compare(currentPassword, storedPassword);
  };
  
  const changePassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    await pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [hashedPassword, userId]);
  };
  
  
    
  module.exports = { 
     updateUserProfile ,
      getUserById,
      updateOrder,
      deleteOrder,
      validatePassword,
      changePassword
     };
  