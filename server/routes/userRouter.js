// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.post('/create', authMiddleware.authorize([1]),  UserController.createOrder);

router.get('/order/user/:orderId', authMiddleware.authorize([1]) ,UserController.getOrderByUserId);

router.get('/userOrders', authMiddleware.authorize([1]), UserController.getUserOrders);


// Protected route example
// router.get('/profile', authenticateToken, (req, res) => {
//   // Access user information from req.user
//   res.json({ message: 'Profile accessed successfully', user: req.user });
// });

module.exports = router;
