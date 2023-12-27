const {pool} = require('../db');

// const getAllOrders = async () => {
//   const orders = await pool.query('SELECT * FROM orders');
//   return orders.rows;
// };

const getAllOrdersWithPaginationAndSearch = async (pageSize, offset, searchTerm) => {
  try {
    const query = `
      SELECT *, COUNT(*) OVER () as total_count 
      FROM orders 
      WHERE 
        order_title ILIKE $3 OR
        shipping_location ILIKE $3 OR
        receiving_location ILIKE $3 OR
        status ILIKE $3
      ORDER BY order_id 
      LIMIT $1 OFFSET $2`;

    const orders = await pool.query(query, [pageSize, offset, `%${searchTerm}%`]);
    return orders.rows;
  } catch (error) {
    console.error('Error in getAllOrdersWithPaginationAndSearch:', error);
    throw error;
  }
};


// In your model file

const getOrdersCount = async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM orders WHERE isdeleted = false');
    const count = result.rows[0].count;
    return count;
  } catch (error) {
    throw error;
  }
};



const getOrdersAmountSum = async () => {
  try {
    const result = await pool.query('SELECT SUM(amount) FROM orders WHERE isdeleted = false');
    const sum = result.rows[0].sum;
    return sum;
  } catch (error) {
    throw error;
  }
};


const getOrderById = async (orderId) => {
  const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [orderId]);
  return order.rows[0];
};

const updateOrderById = async (orderId, name, receiver_name, shipping_location, order_phone_number,receiver_phone_number  , receiving_location, shipping_timestamp, order_truck_size, message, status) => {
  const updatedOrder = await pool.query(
    'UPDATE orders SET name = $1, receiver_name = $2, shipping_location = $3, order_phone_number = $4 , receiver_phone_number = $5  ,receiving_location = $6, shipping_timestamp = $7, order_truck_size = $8, message = $9, status = $10 WHERE order_id = $11 RETURNING *',
    [name, receiver_name, shipping_location,order_phone_number, receiver_phone_number,receiving_location, shipping_timestamp, order_truck_size, message, status, orderId]
  );

  return updatedOrder.rows[0];
};

const deleteOrderById = async (orderId) => {
  const deletedOrder = await pool.query('UPDATE orders SET isdeleted = true WHERE order_id = $1 RETURNING *', [orderId]);
  return deletedOrder.rows[0];
};

const undeleteOrderById = async (orderId) => {
  const deletedOrder = await pool.query('UPDATE orders SET isdeleted = false WHERE order_id = $1 RETURNING *', [orderId]);
  return deletedOrder.rows[0];
};



module.exports = {
  getAllOrdersWithPaginationAndSearch,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  undeleteOrderById,
  getOrdersCount,
  getOrdersAmountSum,
};
