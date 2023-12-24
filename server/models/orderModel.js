const { pool } = require('../db');

// const getDriverOrders = async (driver_id) => {
//     try {
//       const result = await pool.query(
//         'SELECT o.* FROM orders o JOIN order_driver_association a ON o.order_id = a.order_id WHERE a.driver_id = $1',
//         [driver_id]
//       );
//         console.log(result.rows);
//       return result.rows;
//     } catch (error) {
//       console.error('Error in getDriverOrders:', error);
//       throw error;
//     }
//   };

  const getDriverOrderById = async (orderId ) => {
    try {
        const result = await pool.query(
          'SELECT * from orders where order_id = $1',
          [orderId ]
        );
        // console.log(driver_id);
        console.log(orderId);
        console.log(result.rows);
        return result.rows[0];
    } catch (error) {
      console.error('Error in getOrderDetails:', error);
      throw error;
    }

    };

  

    const acceptOrder = async (orderId, driver_id) => {
      try {
        console.log('Driver ID:', driver_id);
        console.log('Order ID:', orderId);
    
        // Update the order status to "accepted" and set the driver_id
        const updatedOrder = await pool.query(
          'UPDATE orders SET status = $1, driver_id = $2 WHERE order_id = $3 RETURNING *',
          ['accepted', driver_id, orderId]
        );
    
        // Change the driver status to "busy"
        const updatedDriver = await pool.query(
          'UPDATE drivers SET status = $1 WHERE driver_id = $2 RETURNING *',
          ['busy', driver_id]
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
    //         // Remove the order from other drivers
//         await client.query(
//           'DELETE FROM order_driver_association WHERE order_id = $1 AND driver_id != $2',
//           [orderId, driverId]
//         );
  
  
const markOrderAsShipped = async (orderId ) => {
  try {
    // Update the order status to "OutForDelivery"
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
    // Update the order status to "OutForDelivery"
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
      driver: updatedDriver.rows[0], // Include the updated driver details

    }
  } catch (error) {
    console.error('Error in markOrderAsDelivered:', error);
    throw error;
  }
};


  
  
module.exports = {
    // getDriverOrders,
    acceptOrder,
    getDriverOrderById,
    markOrderAsShipped,
    markOrderAsDelivered

};


