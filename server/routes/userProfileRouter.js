const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userProfileController');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.get('/user-profile', authMiddleware.authorize([1]), userController.getUserProfile);
router.put('/update-user-profile', upload.single("image"), authMiddleware.authorize([1]), userController.updateUserProfile);
router.get('/user-orders', authMiddleware.authorize([1]), userController.getUserOrders);
router.put('/updateUserOrder/:orderId', authMiddleware.authorize([1]) ,userController.updateOrder);


// router.put("/updatePlanById/:planId", upload.single("image"), verifyToken.authenticateToken, plansController.updatePlanById);


module.exports = router;
