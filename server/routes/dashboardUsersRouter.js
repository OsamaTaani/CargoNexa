const express = require('express');
const router = express.Router();
const userController = require('../controllers/dashboardUsersController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add-user', authMiddleware.authorize([3]) , userController.addUser);
router.get('/all-users', authMiddleware.authorize([3]), userController.getAllUsers);
router.get('/users/:userId', authMiddleware.authorize([3]),userController.getUserById);
router.put('/update-users/:userId', authMiddleware.authorize([3]),userController.updateUserById);
router.put('/delete-users/:userId', authMiddleware.authorize([3]),userController.deleteUserById);
router.put('/undelete-users/:userId',authMiddleware.authorize([3]), userController.undeleteUserById);




module.exports = router;
