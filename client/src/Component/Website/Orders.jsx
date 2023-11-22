import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


const Orders = () => {
  

  // State to store the fetched data
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust as needed

  // Effect to fetch data using Axios when the component mounts
  useEffect(() => {
  
    // Fetch data using Axios
    axios.get('http://localhost:3001/order')
      .then(response => {
        // Set the fetched data to the state
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts


 const handlePrevClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const filteredOrders = orders.filter(order =>
    (order.order_title && order.order_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order. shipping_location && order. shipping_location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.receiving_location && order.receiving_location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.shipping_date && order.shipping_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when search term changes
  };

  return (
    <>
  {/* component */}
  <div className="bg-white p-8 rounded-md w-full">
    <div className=" flex items-center justify-between pb-6">
      <div>
        <h2 className="text-gray-600 font-semibold">Orders</h2>
        {/* <span className="text-xs">All products item</span> */}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex  border  bg-gray-50 items-center p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="bg-gray-50 outline-none ml-1 block "
            type="text"
            name="search"
            id="search"
            placeholder="search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="lg:ml-40 ml-10 space-x-8">
{/*           
          <Link to={'/services'}><button className="bg-gray-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
            Create
          </button>
          </Link> */}
        </div>
      </div>
    </div>
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
            {filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(order => (
              <tr key={order.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                  <Link to={`/orderDetails/${order.id}`}>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                       {order.order_title}
                      </p>
                    </div>
                     </Link> 
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">  {order. shipping_location}</p>
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
    ${order.status === 'pending' ? 'bg-gray-500' : ''}
    ${order.status === 'shipped' ? 'bg-blue-500' : ''}
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
  </div>
</>

  )
}

export default Orders