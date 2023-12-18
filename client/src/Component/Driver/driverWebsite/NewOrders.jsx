


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import EditDriverForm from './EditDriverForm';
import { useCookies } from 'react-cookie';
import { useAuth } from '../../Website/AuthContext';
import Cookies from 'js-cookie';


const NewOrders = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [driverInfo, setDriverInfo] = useState([]);
  
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editDriverInfo, setEditDriverInfo] = useState({});
  
  const [cookies] = useCookies(['token']); // Replace with your actual token cookie name
  console.log(cookies);

  const {isUserRole} = useAuth()
  const role = isUserRole() || Cookies.get('role')

  useEffect(() => {
    // Function to fetch data from the server using Axios
    const fetchData = async () => {
      try {
        const authToken = cookies['token'];
        console.log(authToken);
        const response = await axios.get('http://localhost:3001/driver/orders' ,{
          headers: { 
            Authorization: `${authToken}`,
            
          },
        
        }); // Replace with your actual API endpoint
        setOrders(response.data.data); // Assuming the response data is an array of orders
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures that useEffect runs only once


  useEffect(() => {
    // Filter orders based on the search query
    const filtered = orders.filter((order) => {
      const searchTerm = searchQuery.toLowerCase();
      console.log(order);
    
      // Check if the properties exist before accessing them
      return (
        (order.order_title && order.order_title.toLowerCase().includes(searchTerm)) ||
        (order.order_description && order.order_description.toLowerCase().includes(searchTerm)) ||
        (order.full_name && order.full_name.toLowerCase().includes(searchTerm)) ||
        (order.receiving_location && order.receiving_location.toLowerCase().includes(searchTerm))
      );
    });
    
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  const fetchDriverInfo = async () => {
    try {
      const authToken = cookies['token'];
      console.log(authToken);
      // const response = await axios.get(`http://localhost:3001/driver/${driverId}`);
      const response = await axios.get('http://localhost:3001/driver',{
        headers: { 
          Authorization: `${authToken}`,
          
        },
      
      });
      setDriverInfo(response.data);
    
    } catch (error) {
      console.error('Error fetching driver info:', error);
    }
  };
  
  useEffect(() => {
    // Call the function to fetch driver info
    fetchDriverInfo();
  }, []);
  
  


  // Function to open the edit form
  const openEditForm = (driverData) => {
    setEditDriverInfo(driverData);
    setIsEditFormOpen(true);
  };

  const handleEditFormSubmit = async (updatedDriverInfo) => {
    try {
      // Make an Axios request to update driver information
      await axios.put(`http://localhost:3001/update-drivers`, updatedDriverInfo);
  
      // Close the edit form and fetch updated driver information
      setIsEditFormOpen(false);
      fetchDriverInfo(); // This will fetch the updated driver information
    } catch (error) {
      console.error('Error updating driver info:', error);
    }
  };
  


  return (  
    <>
    <div className="dark:bg-gray-800  border border-gray">
  <div className="dark:bg-transparent">
    <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
      <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-gray-800 dark:text-white font-black leading-10">
        Seize the Road,  
                  <span className="text-my-green "> Embrace  </span>
                  the Journey! 
        </h1>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-600 dark:text-gray-300 font-normal text-center text-xl">
        New Orders Await - Your Next Adventure Begins Now.
        </p>
      </div>
      <div className="flex w-11/12  md:w-8/12 xl:w-6/12">
        <div className="flex rounded-md w-full">
          <input
            type="text"
            name="q"
            value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-md rounded-r-none border-2 border-gray-300 placeholder-current dark:bg-gray-500  dark:text-gray-300 dark:border-none "
            placeholder="keyword"
          />
          <button className="inline-flex items-center gap-2 bg-my-green text-white text-lg font-semibold py-3 px-6 rounded-r-md">
            <span>Find</span>
           
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="grid grid-cols-1 md:grid-cols-4" >
      {/* Driver Info Column */}

      <div className="md:col-span-2 mt-24 md:ml-32" >
      <div className='text-center text-3xl font-bold mb-10'>Driver Information</div>

        {/* Display driver information here */}
        
        <>
        {/* component */}
  <div className="flex flex-col md:order-1 sm:order-2">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-center">
            <thead className=" text-right ">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  <button onClick={openEditForm}>
          <svg class="text-teal-600 w-7 h-7 "
        xmlns="http://www.w3.org/2000/svg" width="30"  height="30"   viewBox="0 0 24 24"  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            {/* ... SVG path for edit */}
            </button>
                </th>
             
              </tr>
            </thead>
            <thead className="border-b ">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                   {driverInfo.driver_username}
                </th>
             
              </tr>
            </thead>
              {/* <tbody>
                <tr className="border-b">
                  <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {driverInfo.driver_password}

                  </td>
                </tr>
              
              </tbody> */}
            <tbody>
              <tr className="border-b">
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {driverInfo.driver_email}
              
                </td>
              </tr>
            
            </tbody>
            <tbody>
              <tr className="border-b">
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {driverInfo.driver_license}

                </td>
              </tr>
            
            </tbody>
            <tbody>
              <tr className="border-b">
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {driverInfo.truck_type}

                </td>
              </tr>
            
            </tbody>
            <tbody>
              <tr className="border-b">
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {driverInfo.production_year}

                </td>
              </tr>
            
            </tbody>
            <tbody>
              <tr className="border-b">
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {driverInfo.plate_number}

                </td>
              </tr>
            
            </tbody>
            <tbody>
              <tr className="border-b">
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {driverInfo.driver_size_type}

                </td>
              </tr>
            
            </tbody>
           
            <tbody>
              <tr className="border-b">
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {driverInfo.status}

                </td>
              </tr>
            
            </tbody>
           
          </table>
        </div>
      </div>
    </div>
  </div>


        </>
        
      </div>
        {/* Edit Form Popup */}
        {isEditFormOpen && (
        <EditDriverForm
          driverInfo={driverInfo}
          onClose={() => setIsEditFormOpen(false)}
          onSubmit={handleEditFormSubmit}
        />
      )}

    {/* new order cards  */}
      <div className="md:col-span-2 max-w-[70rem] md:mx-auto sm:mx-10  mt-24 space-y-10   ">
      <div className='text-center text-3xl font-bold '>New Orders</div>

        <div className="max-w-screen-md md:w-3/4 mx-auto md:order-2 sm:order-1  ">
         
          {filteredOrders.map((order) => (
            <div key={order.id} className="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 mb-10 bg-white border border-gray-300 shadow-lg shadow-gary-500 rounded-xl">
              <p className="w-full md:text-2xl font-semibold text-black">{order.order_title}</p>
              <p className="w-full md:text-md font-semibold text-gray-400">{order.order_description}</p>

              <p className="w-full  font-semibold text-base tracking-wide leading-tight text-gray-600">
               <strong> Shipper Name : </strong>{order.name}
              </p>

              <p className="w-full  font-semibold text-base  tracking-wide leading-tight text-gray-600">
                <strong>Receiving location:</strong> {order.receiving_location}
              </p>

              <p className="w-full pb-4 font-semibold text-base  tracking-wide leading-tight text-gray-600">
                <strong>Shipment Price:</strong>
                {order.amount}
              </p>

              <div className="rounded mx-auto text-center">
                <div className="opacity-95 border rounded-xl bg-my-green hover:bg-teal-500 px-4">
              
                  <Link to={`/orderDetailsDriver/${order.order_id}`}>
                  <button className="text-sm font-medium leading-normal text-white py-2">
                    More Details
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>


      {(role != 2 )&&
   (<Navigate to="/driverLogin" replace/>)
  }
      
  
    </>
  );
};

export default NewOrders;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import EditDriverForm from './EditDriverForm';
// import { useCookies } from 'react-cookie';


// const NewOrders = () => {

//     useEffect(() => {
//         window.scrollTo(0, 0);
//       }, []);

//   const [orders, setOrders] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [driverInfo, setDriverInfo] = useState([]);

  
//   const [isEditFormOpen, setIsEditFormOpen] = useState(false);
//   const [editDriverInfo, setEditDriverInfo] = useState({});
  
//   const [cookies] = useCookies(['token']); // Replace with your actual token cookie name
//   console.log(cookies);


//   useEffect(() => {
//     // Function to fetch data from the server using Axios
//     const fetchData = async () => {
//       try {
//         const authToken = cookies['token'];
//         console.log(authToken);
//         const response = await axios.get('http://localhost:3001/driver/orders' ,{
//           headers: { 
//             Authorization: `${authToken}`,
            
//           },
        
//         }); // Replace with your actual API endpoint
//         setOrders(response.data.data); // Assuming the response data is an array of orders
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchData();
//   }, []); // Empty dependency array ensures that useEffect runs only once


//   useEffect(() => {
//     // Filter orders based on the search query
//     const filtered = orders.filter((order) => {
//       const searchTerm = searchQuery.toLowerCase();
//       console.log(order)
//       return (
//         order.order_title.toLowerCase().includes(searchTerm) ||
//         order.order_description.toLowerCase().includes(searchTerm) ||
//         order.full_name.toLowerCase().includes(searchTerm) ||
//         order.receiving_location.toLowerCase().includes(searchTerm)
//       );
//     });

//     setFilteredOrders(filtered);
//   }, [searchQuery, orders]);

//   const fetchDriverInfo = async () => {
//     try {
//       // const response = await axios.get(`http://localhost:3001/driver/${driverId}`);
//       const response = await axios.get('http://localhost:3001/driver/1');
//       setDriverInfo(response.data);
//     } catch (error) {
//       console.error('Error fetching driver info:', error);
//     }
//   };
  
//   useEffect(() => {
//     // Call the function to fetch driver info
//     fetchDriverInfo();
//   }, []);
  
  


//   // Function to open the edit form
//   const openEditForm = (driverData) => {
//     setEditDriverInfo(driverData);
//     setIsEditFormOpen(true);
//   };

//   const handleEditFormSubmit = async (updatedDriverInfo) => {
//     try {
//       // Make an Axios request to update driver information
//       await axios.put(`http://localhost:3001/driver/1`, updatedDriverInfo);
  
//       // Close the edit form and fetch updated driver information
//       setIsEditFormOpen(false);
//       fetchDriverInfo(); // This will fetch the updated driver information
//     } catch (error) {
//       console.error('Error updating driver info:', error);
//     }
//   };
  


//   return (  
//     <>
//     <div className="dark:bg-gray-800  border border-gray">
//   <div className="dark:bg-transparent">
//     <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
//       <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
//         <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-gray-800 dark:text-white font-black leading-10">
//         Seize the Road,  
//                   <span className="text-my-green "> Embrace  </span>
//                   the Journey! 
//         </h1>
//         <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-600 dark:text-gray-300 font-normal text-center text-xl">
//         New Orders Await - Your Next Adventure Begins Now.
//         </p>
//       </div>
//       <div className="flex w-11/12  md:w-8/12 xl:w-6/12">
//         <div className="flex rounded-md w-full">
//           <input
//             type="text"
//             name="q"
//             value={searchQuery}
//            onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-3 rounded-md rounded-r-none border-2 border-gray-300 placeholder-current dark:bg-gray-500  dark:text-gray-300 dark:border-none "
//             placeholder="keyword"
//           />
//           <button className="inline-flex items-center gap-2 bg-my-green text-white text-lg font-semibold py-3 px-6 rounded-r-md">
//             <span>Find</span>
           
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


// <div className="grid grid-cols-1 md:grid-cols-4" >
//       {/* Driver Info Column */}

//       <div className="md:col-span-2 mt-24 md:ml-32" >
//       <div className='text-center text-3xl font-bold mb-10'>Driver Information</div>

//         {/* Display driver information here */}
        
//         <>
//         {/* component */}
//   <div className="flex flex-col md:order-1 sm:order-2">
//     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//       <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
//         <div className="overflow-hidden">
//           <table className="min-w-full text-center">
//             <thead className=" text-right ">
//               <tr>
//                 <th
//                   scope="col"
//                   className="text-sm font-medium text-gray-900 px-6 py-4"
//                 >
//                   <button onClick={openEditForm}>
//           <svg class="text-teal-600 w-7 h-7 "
//         xmlns="http://www.w3.org/2000/svg" width="30"  height="30"   viewBox="0 0 24 24"  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
//             {/* ... SVG path for edit */}
//             </button>
//                 </th>
             
//               </tr>
//             </thead>
//             <thead className="border-b ">
//               <tr>
//                 <th
//                   scope="col"
//                   className="text-sm font-medium text-gray-900 px-6 py-4"
//                 >
//                    {driverInfo.driver_username}
//                 </th>
             
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
//                 {driverInfo.driver_password}

//                 </td>
//               </tr>
            
//             </tbody>
//             <tbody>
//               <tr className="border-b">
//                 <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
//                 {driverInfo.driver_email}
              
//                 </td>
//               </tr>
            
//             </tbody>
//             <tbody>
//               <tr className="border-b">
//                 <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
//                 {driverInfo.driver_license}

//                 </td>
//               </tr>
            
//             </tbody>
//             <tbody>
//               <tr className="border-b">
//                 <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
//                 {driverInfo.truck_type}

//                 </td>
//               </tr>
            
//             </tbody>
//             <tbody>
//               <tr className="border-b">
//                 <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
//                 {driverInfo.production_year}

//                 </td>
//               </tr>
            
//             </tbody>
//             <tbody>
//               <tr className="border-b">
//                 <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
//                 {driverInfo.plate_number}

//                 </td>
//               </tr>
            
//             </tbody>
//             <tbody>
//               <tr className="border-b">
//                 <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
//                 {driverInfo.truck_size}

//                 </td>
//               </tr>
            
//             </tbody>
           
//           </table>
//         </div>
//       </div>
//     </div>
//   </div>


//         </>
        
//       </div>
//         {/* Edit Form Popup */}
//         {isEditFormOpen && (
//         <EditDriverForm
//           driverInfo={editDriverInfo}
//           onClose={() => setIsEditFormOpen(false)}
//           onSubmit={handleEditFormSubmit}
//         />
//       )}

//     {/* new order cards  */}
//       <div className="md:col-span-2 max-w-[70rem] md:mx-auto sm:mx-10  mt-24 space-y-10   ">
//       <div className='text-center text-3xl font-bold '>New Orders</div>

//         <div className="max-w-screen-md md:w-3/4 mx-auto md:order-2 sm:order-1  ">
         
//           {filteredOrders.length > 0 ? (
//           filteredOrders.map((order) => (
//             <div key={order.id} className="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 mb-10 bg-white border border-gray-300 shadow-lg shadow-gary-500 rounded-xl">
//               <p className="w-full md:text-2xl font-semibold text-black">{order.order_title}</p>
//               <p className="w-full md:text-md font-semibold text-gray-400">{order.order_description}</p>

//               <p className="w-full  font-semibold text-base tracking-wide leading-tight text-gray-600">
//                <strong> Shipper Name : </strong>{order.name}
//               </p>

//               <p className="w-full  font-semibold text-base  tracking-wide leading-tight text-gray-600">
//                 <strong>Receiving location:</strong> {order.receiving_location}
//               </p>

//               <p className="w-full pb-4 font-semibold text-base  tracking-wide leading-tight text-gray-600">
//                 <strong>Shipment Price:</strong>
//                 {/* {order.price} */}
//               </p>

//               <div className="rounded mx-auto text-center">
//                 <div className="opacity-95 border rounded-xl bg-my-green hover:bg-teal-500 px-4">
              
//                   <Link to={`/orderDetailsDriver/${order.order_id}`}>
//                   <button className="text-sm font-medium leading-normal text-white py-2">
//                     More Details
//                   </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             ))  ):
//           (
//             <div className='text-center'>There is No Orders ...</div>
//           )}
//         </div>
//       </div>
//       </div>



      
  
//     </>
//   );
// };

// export default NewOrders;





