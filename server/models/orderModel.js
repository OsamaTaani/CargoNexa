const { pool } = require('../db');


  const getDriverOrderById = async (orderId ) => {
    try {
        const result = await pool.query(
          'SELECT * from orders where order_id = $1',
          [orderId ]
        );
        return result.rows[0];
    } catch (error) {
      console.error('Error in getOrderDetails:', error);
      throw error;
    }

    };

  

    const acceptOrder = async (orderId, driver_id) => {
      try {
        const updatedOrder = await pool.query(
          'UPDATE orders SET status = $1, driver_id = $2 WHERE order_id = $3 RETURNING *',
          ['Accepted', driver_id, orderId]
        );
    
        // Change the driver status to "busy"
        const updatedDriver = await pool.query(
          'UPDATE drivers SET status = $1 WHERE driver_id = $2 RETURNING *',
          ['Busy', driver_id]
        );
    
        // Update the order_driver_association table with the correct driver ID
        await pool.query('DELETE FROM order_driver_association WHERE order_id = $1', [orderId]);
    
        await pool.query(
          'INSERT INTO order_driver_association (order_id, driver_id) VALUES ($1, $2)',
          [orderId, driver_id]
        );
    
        // Retrieve user information who created the order
        const userId = updatedOrder.rows[0].user_id;
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    
        // Return user and order details
        return {
          user: user.rows[0],
          order: updatedOrder.rows[0],
          driver: updatedDriver.rows[0],
        };
      } catch (error) {
        console.error('Error in acceptOrder:', error);
        throw error;
      }
    };  
  
const markOrderAsShipped = async (orderId ) => {
  try {
    const updatedOrder = await pool.query(
      'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *',
      ['OutForDelivery', orderId]
    );

    return updatedOrder.rows[0];
  } catch (error) {
    console.error('Error in markOrderAsShipped:', error);
    throw error;
  }
};

const markOrderAsDelivered = async (orderId ,driver_id ) => {
  try {
    const updatedOrder = await pool.query(
      'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *',
      ['Delivered', orderId]
    );

    const updatedDriver = await pool.query(
      'UPDATE drivers SET status = $1 WHERE driver_id = $2 RETURNING *',
      ['Available', driver_id]
    );


    return {
      order: updatedOrder.rows[0],
      driver: updatedDriver.rows[0], 

    }
  } catch (error) {
    console.error('Error in markOrderAsDelivered:', error);
    throw error;
  }
};


  
  
module.exports = {
    acceptOrder,
    getDriverOrderById,
    markOrderAsShipped,
    markOrderAsDelivered

};


