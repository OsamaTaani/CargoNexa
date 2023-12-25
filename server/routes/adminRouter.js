// routes/adminAuthRouter.js
const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');



// Create a new admin
router.post('/createAdmin',authMiddleware.authorize([3]) ,adminAuthController.registerAdmin);

// Admin login
router.post('/login', adminAuthController.loginAdmin);

// Get all admins
router.get('/allAdmins',authMiddleware.authorize([3]), adminAuthController.getAllAdmins);

// Get admin by ID
router.get('/:adminId', authMiddleware.authorize([3]), adminAuthController.getAdminById);

// Update admin by ID
router.put('/update/:adminId', authMiddleware.authorize([3]), adminAuthController.updateAdminById);

// Delete admin by ID
router.put('/softDelete/:adminId', authMiddleware.authorize([3]), adminAuthController.deleteAdminById);

router.put('/unDelete/:adminId', authMiddleware.authorize([3]), adminAuthController.undeleteAdminById);


module.exports = router;


