const express = require('express');
const router = express.Router();
const UserController = require('../controllers/forgetPwdController');
const authMiddleware = require('../middleware/authMiddleware')
// Password reset route
router.post('/reset-password',  UserController.forgotPassword);
router.post('/change-password', UserController.resetPassword);

module.exports = router; 
