import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EditForm = ({ onClose, orderDetails ,onSubmit}) => {
  const [editedOrder, setEditedOrder] = useState(orderDetails);



  const handleChange = (e) => {
   
    const { name, value } = e.target;
    console.log(`Handling change for ${name}: ${value}`);

    setEditedOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit(editedOrder);

  };
 
  
  return (
    
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white w-96 p-6 rounded-lg z-10 my-6">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
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
              <div className="mb-2">
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
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Receiving Timestamp</label>
                <input
                id='receiving_timestamp'
                  type="text"
                  name="receiving_timestamp"
                  value={editedOrder.receiving_timestamp}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2"> Shipper Phone Number</label>
                <input
                id='order_phone_number'
                  type="text"
                  name="order_phone_number"
                  value={editedOrder.order_phone_number}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2"> Order message</label>
                <input
                id='message'
                  type="text"
                  name="message"
                  value={editedOrder.message}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
             
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2"> Receiver Name</label>
                <input
                id='receiver_name'
                  type="text"
                  name="receiver_name"
                  value={editedOrder.receiver_name}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2"> Receiver Phone Number</label>
                <input
                id='receiver_phone_number'
                  type="text"
                  name="receiver_phone_number"
                  value={editedOrder.receiver_phone_number}
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