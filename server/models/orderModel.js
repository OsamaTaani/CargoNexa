const { pool } = require('../db');

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
        shipping_date,
    } = orderData;

    try {
        // Log timestamp values before conversion
        console.log('Raw receiving_timestamp:', receiving_timestamp);
        console.log('Raw shipping_timestamp:', shipping_timestamp);

        const currentDate = new Date(); // Get the current date

        // Format timestamps
        const formattedReceivingTimestamp = new Date(`${currentDate.toISOString().split('T')[0]}T${receiving_timestamp}:00.000Z`).toISOString();
        const formattedShippingTimestamp = new Date(`${currentDate.toISOString().split('T')[0]}T${shipping_timestamp}:00.000Z`).toISOString();

        // Log formatted timestamp values
        console.log('Formatted receiving_timestamp:', formattedReceivingTimestamp);
        console.log('Formatted shipping_timestamp:', formattedShippingTimestamp);

        // Get available drivers based on truck size
        const availableDrivers = await pool.query(
            'SELECT driver_id FROM drivers WHERE driver_size_type = $1 AND status = $2',
            [order_truck_size, 'Available']
        );

        // Insert the order into the orders table
        const newOrder = await pool.query(
            'INSERT INTO orders (user_id, name, receiver_name, shipping_location, receiving_location, receiving_timestamp, shipping_timestamp, order_truck_size, order_description, order_phone_number, receiver_phone_number, message, order_title, contains_dangerous_materials, shipping_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
            [userId, name, receiver_name, shipping_location, receiving_location, formattedReceivingTimestamp, formattedShippingTimestamp, order_truck_size, order_description, order_phone_number, receiver_phone_number, message, order_title, contains_dangerous_materials, shipping_date]
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

const getDriverOrders = async (driver_id) => {
    try {
      const result = await pool.query(
        'SELECT o.* FROM orders o JOIN order_driver_association a ON o.order_id = a.order_id WHERE a.driver_id = $1',
        [driver_id]
      );
        console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error in getDriverOrders:', error);
      throw error;
    }
  };

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

    const getOrdersByUserId = async (userId, orderId) => {
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
    
  

  const acceptOrder = async (orderId, driver_id) => {
    try {
      console.log('Driver ID:', driver_id); // Log the driver ID
      console.log("orderID :" , orderId);
  
      // Update the order status to "accepted" and soft delete the order
      const updatedOrder = await pool.query(
        'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *',
        ['accepted', orderId]
      );
  
      // Change the driver status to "busy"
      const updatedDriver = await pool.query(
        'UPDATE drivers SET status = $1 WHERE driver_id = $2 RETURNING *',
        ['busy', driver_id]
      );
  
  
      // Update the order_driver_association table with the correct driver ID
// Update the order_driver_association table with the correct driver ID
await pool.query(
  'DELETE FROM order_driver_association WHERE order_id = $1', [orderId]
);

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
        driver: updatedDriver.rows[0], // Include the updated driver details
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
  
  
  
  
module.exports = {
    createOrder,
    getDriverOrders,
    acceptOrder,
    getDriverOrderById,
    getOrdersByUserId

};


