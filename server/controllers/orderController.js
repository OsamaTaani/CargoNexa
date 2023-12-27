const OrderModel = require('../models/orderModel');



  const getDriverOrderByIdController = async (req, res) => {
    const orderId = req.params.orderId;

    try {
      const orderDetails = await OrderModel.getDriverOrderById(orderId);
  
      if (!orderDetails) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      res.status(200).json(orderDetails);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
    
  const acceptOrder = async (req, res) => {
    const  {orderId}  = req.params;
    const driver_id = req.user.driver_id; 
  
    try {
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
    const driver_id = req.user.driver_id;
  
  
    try {
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
    acceptOrder,
    getDriverOrderByIdController,
    markOrderAsShippedController,
    markOrderAsDeliveredController,

};
