// controllers/orderController.js
const OrderModel = require('../models/orderModel');


// const getDriverOrders = async (req, res) => {
//     const driver_id  = req.user.driver_id;
//     console.log(driver_id);
  
//     try {
//       const orders = await OrderModel.getDriverOrders(driver_id);
  
//       res.status(200).json({
//         message: 'Orders fetched successfully',
//         data: orders,
//       });
//     } catch (error) {
//       console.error('Error in getDriverOrders:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };

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
  

  const markOrderAsShippedController = async (req, res) => {
    const {orderId} = req.params;
    console.log(orderId);

  
    try {
      const updatedOrder = await OrderModel.markOrderAsShipped(orderId);
  
      if (updatedOrder) {
        res.json({ success: true, message: 'Order marked as shipped successfully', order: updatedOrder });
      } else {
        res.status(404).json({ success: false, message: 'Order not found or could not be marked as shipped' });
      }
    } catch (error) {
      console.error('Error in markOrderAsShippedController:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  const markOrderAsDeliveredController = async (req, res) => {
    const { orderId } = req.params;
    // Check if req.user and req.user.driver_id are defined
    const driver_id = req.user.driver_id;
  
    console.log(driver_id);
    console.log(orderId);
  
    try {
      // Check if driver_id is defined before proceeding
      if (!driver_id) {
        throw new Error('Driver ID not found in the request');
      }
  
      const updatedOrder = await OrderModel.markOrderAsDelivered(orderId, driver_id);
  
      if (updatedOrder.order) {
        res.json({
          success: true,
          message: 'Order marked as Delivered successfully',
          order: updatedOrder.order,
          driver: updatedOrder.driver,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Order not found or could not be marked as Delivered',
        });
      }
    } catch (error) {
      console.error('Error in markOrderAsShippedController:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  
  
  
  
module.exports = {
    // getDriverOrders,
    acceptOrder,
    getDriverOrderByIdController,
    markOrderAsShippedController,
    markOrderAsDeliveredController,

};
