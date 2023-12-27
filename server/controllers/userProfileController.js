const UserModel = require('../models/userProfileModel');

const Firebase = require('../middleware/firebaseMiddleware')


const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userProfile = await UserModel.getUserById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const updateUserProfile = async (req, res) => {
  try {
    const file = req.file;
    

    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);

      req.body.user_image = fileUrl;
    }

    const userId = req.user.userId;

    const updatedInfo = req.body;

    if (updatedInfo.image) {
      updatedInfo.user_image = updatedInfo.image;
    }

    const updatedUser = await UserModel.updateUserProfile(userId, updatedInfo);

    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  


const updateOrder = async (req, res) => {
  const orderId = req.params.orderId; 
  const userId = req.user.userId; 
  const updatedOrderData = req.body; 

  try {
    const updatedOrder = await UserModel.updateOrder(userId, orderId, updatedOrderData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await UserModel.deleteOrder(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order soft deleted successfully', order: deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {  currentPassword, newPassword } = req.body;
    const isPasswordValid = await UserModel.validatePassword(userId, currentPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    await UserModel.changePassword(userId, newPassword);

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




  
  module.exports = { updateUserProfile , getUserProfile,updateOrder , deleteOrder , changePassword};
  