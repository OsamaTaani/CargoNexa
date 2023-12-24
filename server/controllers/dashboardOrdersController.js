const OrderModel = require('../models/dashboardOrdersModel');


// Get All Orders
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await OrderModel.getAllOrders();
//     res.status(200).json( orders );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// controllers/orderController.js

const createOrderForUserController = async (req, res) => {
  try {
      const { userId } = req.params;
      const orderData = req.body;

      // Set createdByAdmin to true since it's an admin creating the order
      const createdByAdmin = true;

      const newOrder = await createOrderForUser(userId, orderData, createdByAdmin);

      res.status(201).json(newOrder);
  } catch (error) {
      console.error('Error in createOrderForUserController:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllOrdersWithPaginationAndSearch = async (req, res) => {
  try {
    const { page = 1, pageSize = 5, search } = req.query;
    const offset = (page - 1) * pageSize;

    const orders = await OrderModel.getAllOrdersWithPaginationAndSearch(pageSize, offset, search);
    
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error in getAllOrdersWithPaginationAndSearch:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get Order by ID
const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await OrderModel.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Order by ID
const updateOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  const { name, receiver_name, shipping_location, receiving_location, shipping_timestamp, order_truck_size, order_description, status } = req.body;

  try {
    const updatedOrder = await OrderModel.updateOrderById(orderId, name, receiver_name, shipping_location, receiving_location, shipping_timestamp, order_truck_size, order_description, status);

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete Order by ID
const deleteOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await OrderModel.deleteOrderById(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order soft deleted successfully', order: deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllOrdersWithPaginationAndSearch,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  createOrderForUserController,
};
