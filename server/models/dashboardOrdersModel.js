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
        order_title LIKE $3 OR
        shipping_location LIKE $3 OR
        receiving_location LIKE $3 OR
        status LIKE $3
      ORDER BY order_id 
      LIMIT $1 OFFSET $2`;

    const orders = await pool.query(query, [pageSize, offset, `%${searchTerm}%`]);
    return orders.rows;
  } catch (error) {
    console.error('Error in getAllOrdersWithPaginationAndSearch:', error);
    throw error;
  }
};


const getOrderById = async (orderId) => {
  const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [orderId]);
  return order.rows[0];
};

const updateOrderById = async (orderId, name, receiver_name, shipping_location, receiving_location, shipping_timestamp, order_truck_size, order_description, status) => {
  const updatedOrder = await pool.query(
    'UPDATE orders SET name = $1, receiver_name = $2, shipping_location = $3, receiving_location = $4, shipping_timestamp = $5, order_truck_size = $6, order_description = $7, status = $8 WHERE order_id = $9 RETURNING *',
    [name, receiver_name, shipping_location, receiving_location, shipping_timestamp, order_truck_size, order_description, status, orderId]
  );

  return updatedOrder.rows[0];
};

//Soft Delete
// const deleteOrderById = async (orderId) => {
//   const deletedOrder = await pool.query('UPDATE orders SET isDelete = true WHERE order_id = $1 RETURNING *', [orderId]);
//   return deletedOrder.rows[0];
// };

const deleteOrderById = async (orderId) => {
  const deletedOrder = await pool.query('UPDATE orders SET isDeleted = true WHERE order_id = $1 RETURNING *', [orderId]);
  return deletedOrder.rows[0];
};


module.exports = {
  getAllOrdersWithPaginationAndSearch,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
