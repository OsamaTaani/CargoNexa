

import React, { useEffect, useState } from 'react'
import bg from '../Images/bg.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditUserForm from './EditUserForm';

const UserProfile = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [userData, setUserData] = useState({});
  const [showOrdersTable, setShowOrdersTable] = useState(false); // Add state for showing the orders table
  const [orders, setOrders] = useState([]); // Add state for storing orders data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust as needed
  
  const handlePrevClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user-profile`);
        setUserData(response.data.userProfile);
        // console.log(response.data.)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch orders data
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/user`); // Replace with your orders API endpoint
        setOrders(response.data);
        console.log(response.data[0]);
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    };

 
  useEffect(() => {
    // Fetch data on component mount
    fetchUserData();
    fetchOrders();
  }, []); // Dependency array is empty, meaning it will run once on mount


  const handleMyInfoClick = () => {
    setShowOrdersTable(false);
  };

  const handleMyOrdersClick = () => {
    setShowOrdersTable(true);
  }; 


  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditClick = (userId) => {
    setUserIdToEdit(userId);
    setShowEditForm(true);
  };

  const handleSoftDeleteUser = async (userId) => {
    console.log("user",userId)
    try {
      // Send a soft delete request to the server by updating isDeleted to true
      await axios.put(`http://localhost:3001/user-profile/${userId}`, { isDeleted: true });
      // Perform any additional actions after soft deletion if needed
      // e.g., refresh the user data
      fetchUserData();
    } catch (error) {
      console.error('Error soft deleting user:', error);
    }
  };

  return (
   <>
  
  {/* component */}
  
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
  />
  <div className="relative block h-500-px ">
    <div
      className="absolute  w-full h-96 bg-my-green"
    
    >
     
    </div>
    <div
      className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
      style={{ transform: "translateZ(0px)" }}
    >
   
    </div>
  </div>
  <div className="relative py-16 bg-blueGray-200">
    <div className="container mx-auto px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-40">
        <div className="px-6 ">
          <div className='flex justify-center  '>
        <img
                  alt="..."
                  src={userData.user_image}
                  className="shadow-xl rounded-full  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16  h-[150px] w-[150px] "
                /></div>
        
          <div className="text-center mt-28">
          <div class="flex  p-2 w-full justify-center">
          <button
  onClick={handleMyInfoClick}
  className="min-w-auto w-32 h-10 bg-my-green p-2 rounded-l-xl transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold"
>
  My Info
</button>
      
      <button
       class="min-w-auto w-32 h-10 bg-my-green p-2 rounded-r-xl  transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold"
       onClick={handleMyOrdersClick}>
      My Orders
      </button>
  </div>

 

       
        </div>
      </div>
      {showOrdersTable ?(
       <div>
       <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
         <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
           <table className="min-w-full leading-normal">
             <thead>
               <tr>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   Order Name
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 shipping Location
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 receiving Location
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 shipping Date
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 Status
                 </th>
               </tr>
             </thead>
             <tbody>
             {orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(order => (
               <tr key={orders.orderId}>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <div className="flex items-center">
                   <Link to={`/orderDetails/${order.order_id}`}>
                     <div className="ml-3">
                       <p className="text-gray-900 whitespace-no-wrap">
                        {order.order_title}
                       </p>
                     </div>
                      </Link> 
                   </div>
                 </td>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <p className="text-gray-900 whitespace-no-wrap">  {order.shipping_location}</p>
                 </td>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <p className="text-gray-900 whitespace-no-wrap">
                 
                   {order.receiving_location}
                   </p>
                 </td>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <p className="text-gray-900 whitespace-no-wrap">{order.shipping_date}</p>
                 </td>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <span className={`relative inline-block px-5 py-2 font-semibold leading-tight  text-white
                 ${order.status === 'Pending' ? 'bg-gray-500' : ''}
                 ${order.status === 'shipped' ? 'bg-yellow-500' : ''}
                 ${order.status === 'on the way' ? 'bg-orange-500' : ''}
                 ${order.status === 'delivered' ? 'bg-green-500' : ''}
               rounded-full
               `}>
               
                 <span className="relative">{order.status}</span>
               </span>
             </td>
 
               </tr>
                ))}
         
             </tbody>
           </table>
            </div>
           <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
             <div className="inline-flex mt-2 xs:mt-0">
               <button  onClick={handlePrevClick}
             disabled={currentPage === 1}
             className={`text-sm text-white transition duration-150 ${
               currentPage === 1 ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
             } font-semibold py-2 px-4 rounded-l`}>
                 Prev
               </button>
               &nbsp; &nbsp;
               <button
             onClick={handleNextClick}
             disabled={orders.length < itemsPerPage}
             className={`text-sm text-white transition duration-150 ${
               orders.length < itemsPerPage ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
             } font-semibold py-2 px-4 rounded-r`}
           >
                 Next
               </button>
             </div>
           </div>
        
       </div>
     </div>
        ):
        <div>
        <h3 className="text-4xl text-center font-semibold leading-normal text-blueGray-700 mb-2">
        {userData.user_username}
        </h3>
        <div className="flex items-center justify-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
          <svg className="text-orange-600 w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          {userData.user_email}
        </div>
        <div className="flex items-center justify-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
        <svg class="text-orange-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor"> <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>

          {userData.user_phone_number}
        </div>
        <div className="flex items-center justify-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
        <svg class="text-orange-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor"> <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>

          {userData.user_password}
        </div>

        <div className="flex space-x-2">
        
        <button onClick={() => handleEditClick(userData.user_id)}>
        <div>{userData.user_id}</div>

           <svg class="text-teal-600 w-5 h-5 "
         xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
             {/* ... SVG path for edit */}
             </button>
 
             <button onClick={() => handleSoftDeleteUser(userData.user_id) } >
           <svg class="text-orange-600 w-5 h-5"
           xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
           </svg>
           </button>
 

           {showEditForm && (
        <EditUserForm
          userId={userIdToEdit}
          onClose={() => setShowEditForm(false)}
          onUpdate={
            userData// Refresh user data after update
           }
        />
      )}

             {/* ... SVG path for delete */}
          
         </div>

        </div>
        
        }
    </div>
    </div>
    
   
  </div>
</>

  
  )
}

export default UserProfile