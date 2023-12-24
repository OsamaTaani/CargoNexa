const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for creating a new order
// router.post('/create', authMiddleware.authorize([1]),  orderController.createOrder);


router.put('/orders/accept/:orderId',authMiddleware.authorize([2]), orderController.acceptOrder);



router.get('/driver/order/:orderId' , authMiddleware.authorize([2]) , orderController.getDriverOrderByIdController);


router.put('/orders/shipped/:orderId', orderController.markOrderAsShippedController);
router.put('/orders/delivered/:orderId' ,authMiddleware.authorize([2]), orderController.markOrderAsDeliveredController);


module.exports = router;
