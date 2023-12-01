const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for creating a new order
router.post('/create', authMiddleware.authorize([1]),  orderController.createOrder);

router.put('/orders/accept/:orderId',authMiddleware.authorize([2]), orderController.acceptOrder);


router.get('/driver/orders', authMiddleware.authorize([2]), orderController.getDriverOrders);

router.get('/driver/order/:orderId' , authMiddleware.authorize([2]) , orderController.getDriverOrderByIdController);

router.get('/orders/user/', authMiddleware.authorize([1]) ,orderController.getOrdersByUserId);


module.exports = router;
