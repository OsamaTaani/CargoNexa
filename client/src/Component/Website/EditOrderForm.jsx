// EditForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditForm = ({ onClose, orderDetails }) => {
  const [editedData, setEditedData] = useState(orderDetails);
  
  
  useEffect(() => {
    // Fetch the order details when the component mounts
    const fetchOrderDetails = async () => {
      try {  
        const response = await axios.get(`http://localhost:3001/order/${orderDetails.id}`);
        // Assuming the API returns order details as JSON
        setEditedData(response.data);
      

      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderDetails.id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Update the order details using Axios
      await axios.put(`http://localhost:3001/order/${orderDetails.id}`, editedData);
      // Close the form after successful update
      onClose();
    } catch (error) {
      console.error('Error updating order:', error);
      // Handle error appropriately (e.g., show error message to the user)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="editedField" className="block text-sm font-medium text-gray-600">
              Edited Field
            </label>
            <input
              type="text"
              id="editedField"
              name="editedField"
              value={editedData.editedField || ''}
              onChange={(e) => setEditedData({ ...editedData, editedField: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Add more form fields as needed */}

          <div className="flex justify-end">
            <button type="submit" className="bg-my-green text-white px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
