const OrderModel = require('../models/dashboardOrdersModel');



const createOrderForUserController = async (req, res) => {
  try {
      const { userId } = req.params;
      const orderData = req.body;

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

const getOrdersCount = async (req, res) => {
  try {
    const count = await OrderModel.getOrdersCount();
    res.status(200).json( count );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrdersAmountSum = async (req, res) => {
  try {
    const sum = await OrderModel.getOrdersAmountSum();
    res.status(200).json( sum );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

const updateOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  const { name, receiver_name, shipping_location, order_phone_number,receiver_phone_number  , receiving_location, shipping_timestamp, order_truck_size, message, status} = req.body;

  try {
    const updatedOrder = await OrderModel.updateOrderById(orderId, name, receiver_name, shipping_location, order_phone_number,receiver_phone_number  , receiving_location, shipping_timestamp, order_truck_size, message, status);

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

const undeleteOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await OrderModel.undeleteOrderById(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order undeleted successfully', order: deletedOrder });
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
  undeleteOrderById,
  getOrdersCount,
  getOrdersAmountSum,
};
