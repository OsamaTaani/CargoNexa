// driverRoutes.js
const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/driverController');
const  authMiddleware = require('../middleware/authMiddleware');

router.post('/register', DriverController.registerDriver);
router.post('/login', DriverController.loginDriver);

router.get('/driver', authMiddleware.authorize([2]) ,DriverController.getDriverInfo);
router.put('/updateDriver', authMiddleware.authorize([2]) ,DriverController.updateDriver);
router.get('/driverOrders', authMiddleware.authorize([2]), DriverController.getDriverOrders);
router.get('/driverHistory', authMiddleware.authorize([2]), DriverController.getDriverHistory);



// Protected route example
// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({ message: 'Driver profile accessed successfully', driver: req.user });
// });

module.exports = router;
