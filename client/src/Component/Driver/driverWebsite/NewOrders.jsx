import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewOrders = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Function to fetch data from the server using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/order'); // Replace with your actual API endpoint
        setOrders(response.data); // Assuming the response data is an array of orders
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
      return (
        order.order_title.toLowerCase().includes(searchTerm) ||
        order.order_description.toLowerCase().includes(searchTerm) ||
        order.full_name.toLowerCase().includes(searchTerm) ||
        order.receiving_location.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

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
            <svg
              className="text-gray-200 h-5 w-5 p-0 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: "new 0 0 56.966 56.966" }}
              xmlSpace="preserve"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    {/* new order cards  */}
      <div className=" max-w-6xl md:mx-auto sm:mx-10  mt-24 space-y-10  ">
        <div className="max-w-screen-md md:w-3/4 mx-auto  ">
          {filteredOrders.map((order) => (
            <div key={order.id} className="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 mb-10 bg-white border border-gray-300 shadow-lg shadow-gary-500 rounded-xl">
              <p className="w-full md:text-2xl font-semibold text-black">{order.order_title}</p>
              <p className="w-full md:text-md font-semibold text-gray-400">{order.order_description}</p>
              <p className="w-full  font-semibold text-base tracking-wide leading-tight text-gray-600">
               <strong> Shipper Name : </strong>{order.full_name}
              </p>
              <p className="w-full pb-4 font-semibold text-base  tracking-wide leading-tight text-gray-600">
                <strong>Receiving location:</strong> {order.receiving_location}
              </p>
              <div className="rounded mx-auto text-center">
                <div className="opacity-95 border rounded-xl bg-my-green hover:bg-teal-500 px-4">
              
                  <Link to={`/orderDetailsDriver/${order.id}`}>
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
    </>
  );
};

export default NewOrders;
