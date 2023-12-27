// userModel.js
const { pool } = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (user_username, user_password, user_email) => {
  const role_id = 1;
  const hashedPassword = await bcrypt.hash(user_password, 10); // Hash the password before storing

  const query = 'INSERT INTO users (user_username, user_password, user_email, role_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await pool.query(query, [user_username, hashedPassword, user_email , role_id]);
  return result.rows[0];
};

const googleAccount = async ({ user_username, user_email, picture }) => {
  const role_id = "1";
  // const created_at = new Date();
  const user_password = "No Access";
  const query = `
  INSERT INTO users (user_username,user_email,user_password,role_id,user_image) VALUES ($1, $2, $3, $4, $5)
  RETURNING *`;

  const values = [
    user_username,
    user_email,
    user_password,
    role_id,
    picture,
  ];
  const user = await pool.query(query, values);
  return user.rows[0];
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

const getOrderByUserId = async (userId, orderId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 and order_id = $2',
      [userId, orderId]
    );

    return result.rows;
  } catch (error) {
    console.error('Error in getOrdersByUserId:', error);
    throw error;
  }
};

const getUserOrders = async (userId) => {
  try {
      const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 AND isdeleted = false', [userId]);
      return result.rows;
  } catch (error) {
      console.error('Error in getUserOrders:', error);
      throw error;
  }
};


const createOrder = async (userId, orderData) => {
  const {
      name,
      receiver_name,
      shipping_location,
      receiving_location,
      receiving_timestamp,
      shipping_timestamp,
      order_truck_size,
      order_description,
      order_phone_number,
      receiver_phone_number,
      message,
      order_title,
      contains_dangerous_materials,
      payment_method,
      amount,
  } = orderData;

  try {

      // Format timestamps
      const extractTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return new Date(2000, 0, 1, hours, minutes); // Use a fixed date (2000-01-01) or adjust as needed
    };
    
    const formattedReceivingTimestamp = extractTime(receiving_timestamp).toLocaleTimeString('en-US', { hour12: true });
    const formattedShippingTimestamp = extractTime(shipping_timestamp).toLocaleTimeString('en-US', { hour12: true });
          
      // Get available drivers based on truck size
      const availableDrivers = await pool.query(
          'SELECT driver_id FROM drivers WHERE driver_size_type = $1 AND status = $2',
          [order_truck_size, 'Available']
      );

      // Insert the order into the orders table
      const newOrder = await pool.query(
          'INSERT INTO orders (user_id, name, receiver_name, shipping_location, receiving_location, receiving_timestamp, shipping_timestamp, order_truck_size, order_description, order_phone_number, receiver_phone_number, message, order_title, contains_dangerous_materials , payment_method , amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15 , $16 ) RETURNING *',
          [userId, name, receiver_name, shipping_location, receiving_location, formattedReceivingTimestamp, formattedShippingTimestamp, order_truck_size, order_description, order_phone_number, receiver_phone_number, message, order_title, contains_dangerous_materials , payment_method , amount]
      );

      // Associate the order with available drivers
      const orderId = newOrder.rows[0].order_id;
      for (const driver of availableDrivers.rows) {
          await pool.query('INSERT INTO order_driver_association (order_id, driver_id) VALUES ($1, $2)', [orderId, driver.driver_id]);
      }

      // Fetch the details of associated drivers
      const associatedDrivers = await pool.query(
          'SELECT drivers.* FROM drivers JOIN order_driver_association ON drivers.driver_id = order_driver_association.driver_id WHERE order_driver_association.order_id = $1',
          [orderId]
      );

      // Include the associated drivers in the response
      newOrder.rows[0].drivers = associatedDrivers.rows;

      return newOrder.rows[0];
  } catch (error) {
      console.error('Error in createOrder:', error);
      throw error; // Re-throw the error
  }
};



module.exports = { 
  createUser,
   getUserByEmail,
    verifyCredentials,
    getOrderByUserId,
    getUserOrders,
    createOrder,
    googleAccount
  };
