// controllers/orderController.js
const OrderModel = require('../models/orderModel');


const createOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orderData = req.body;

        const newOrder = await OrderModel.createOrder(userId, orderData);

        res.status(201).json({ message: 'Order created successfully', 
        data: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getDriverOrders = async (req, res) => {
    const driver_id  = req.user.driver_id;
    console.log(driver_id);
  
    try {
      const orders = await OrderModel.getDriverOrders(driver_id);
  
      res.status(200).json({
        message: 'Orders fetched successfully',
        data: orders,
      });
    } catch (error) {
      console.error('Error in getDriverOrders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getDriverOrderByIdController = async (req, res) => {
    const orderId = req.params.orderId;
    console.log('Controller - Order ID:', orderId);

  
    try {
      const orderDetails = await OrderModel.getDriverOrderById(orderId);
  
      if (!orderDetails) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      res.status(200).json(orderDetails);
    } catch (error) {
      console.error('Error in getDriverOrderByIdController:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
    

  const getOrdersByUserId = async (req, res) => {
    const userId = req.user.userId;
    console.log(userId);
  
    try {
      const orders = await OrderModel.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      console.error('Error getting orders by user ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const acceptOrder = async (req, res) => {
    const  {orderId}  = req.params;
    const driver_id = req.user.driver_id; // Change this line
    console.log(driver_id)
  
    try {
      // Call the acceptOrder function in the model
      const acceptedOrderDetails = await OrderModel.acceptOrder(orderId, driver_id);
  
      res.status(200).json({
        message: 'Order accepted successfully',
        data: acceptedOrderDetails,
      });
    } catch (error) {
      console.error('Error in acceptOrder controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  
  
module.exports = {
    createOrder,
    getDriverOrders,
    acceptOrder,
    getDriverOrderByIdController,
    getOrdersByUserId

};
