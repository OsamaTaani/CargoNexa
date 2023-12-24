const express = require('express');
const router = express.Router();
const driverController = require('../controllers/dashboardDriversController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addDriver' , driverController.addDriver);
router.get('/drivers', authMiddleware.authorize([3]), driverController.getAllDrivers);
router.get('/driver/:driver_id', authMiddleware.authorize([3]) ,driverController.getDriverById);

router.put('/update-drivers/:driver_id', authMiddleware.authorize([3]) ,driverController.updateDriverById);
router.put('/delete-drivers/:driverId', authMiddleware.authorize([3]) , driverController.deleteDriverById);

module.exports = router;
