const UserModel = require('../models/userProfileModel');

const Firebase = require('../middleware/firebaseMiddleware')


const getUserProfile = async (req, res) => {
  try {
    // Assuming you have the user ID available in the request (you can extract it from the JWT token)
    const userId = req.user.userId;

    // Retrieve user information from the database
    const userProfile = await UserModel.getUserById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user profile information in the response
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
      console.log(fileUrl);

      req.body.user_image = fileUrl;
    }

    const userId = req.user.userId;

    const updatedInfo = req.body;

    // Conditionally add user_image only if it exists in updatedInfo
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
  
  // const getUserOrders = async (req, res) => {
  //   try {
  //     const userId = req.user.user_id;
  
  //     // Assuming you have a function in your model to retrieve user orders
  //     const userOrders = await OrderModel.getUserOrders(userId);
  
  //     res.status(200).json({ userOrders });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };


// Update order for a specific user
const updateOrder = async (req, res) => {
  const orderId = req.params.orderId; // Assuming orderId is passed in the URL
  console.log(orderId);
  const userId = req.user.userId; // Assuming userId is passed in the URL
  console.log(userId);
  const updatedOrderData = req.body; // Assuming the updated data is sent in the request body

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
    // Validate current password
    const isPasswordValid = await UserModel.validatePassword(userId, currentPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    // Change password and store it hashed
    await UserModel.changePassword(userId, newPassword);

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




  
  module.exports = { updateUserProfile , getUserProfile,updateOrder , deleteOrder , changePassword};
  