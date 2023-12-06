// // EditForm.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditForm = ({ onClose, orderDetails }) => {
//   const [editedData, setEditedData] = useState(orderDetails);
  
  
//   useEffect(() => {
//     // Fetch the order details when the component mounts
//     const fetchOrderDetails = async () => {
//       try {  
//         const response = await axios.get(`http://localhost:3001/order/${orderDetails.id}`);
//         // Assuming the API returns order details as JSON
//         setEditedData(response.data);
      

//       } catch (error) {
//         console.error('Error fetching order details:', error);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderDetails.id]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Update the order details using Axios
//       await axios.put(`http://localhost:3001/order/${orderDetails.id}`, editedData);
//       // Close the form after successful update
//       onClose();
//     } catch (error) {
//       console.error('Error updating order:', error);
//       // Handle error appropriately (e.g., show error message to the user)
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="bg-black opacity-50 fixed inset-0"></div>
//       <div className="bg-white p-6 rounded-lg z-10">
//         <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
//         <form key={orderDetails.id} onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-600">
//               Edited Field
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={editedData.name}
//               onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div>

//           {/* Add more form fields as needed */}

//           <div className="flex justify-end">
//             <button type="submit" className="bg-my-green text-white px-4 py-2 rounded-md mr-2">
//               Save
//             </button>
//             <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditForm;









import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EditForm = ({ onClose, orderDetails }) => {
  const [editedOrder, setEditedOrder] = useState(orderDetails);

  // useEffect(() => {
  //   setEditedOrder(orderDetails);
  // }, [orderDetails]);

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    console.log(`Handling change for ${name}: ${value}`);

    setEditedOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Use Axios to send a PUT request to update the order
      await axios.put(`http://localhost:3001/orders/${editedOrder.id}`, editedOrder);

      // Close the form or perform any other actions upon successful update
      onClose();
    } catch (error) {
      console.error('Error updating order:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };
 
  
  return (
    
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white w-96 p-6 rounded-lg z-10 my-6">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Shipper Name</label>
                <input
                id='name'
                  type="text"
                  name="name"
                  value={editedOrder.name}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Order Title</label>
                <input
                id='order_title'
                  type="text"
                  name="order_title"
                  value={editedOrder.order_title}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"> Order Description</label>
                <input
                id='order_description'
                  type="text"
                  name="order_description"
                  value={editedOrder.order_description}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
             
            
            
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-my-green text-white py-2 px-4 rounded-full hover:bg-teal-400 focus:outline-none focus:shadow-outline-blue"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    
  };
  

  

export default EditForm