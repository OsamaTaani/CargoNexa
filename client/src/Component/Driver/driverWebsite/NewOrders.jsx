import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewOrders = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const [orders, setOrders] = useState([]);

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

  return (
    <>
      <div className=" max-w-6xl md:mx-auto sm:mx-10  mt-24 space-y-10  ">
        <div className="max-w-screen-md md:w-3/4 mx-auto  ">
          {orders.map((order) => (
            <div key={order.id} className="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 mb-10 bg-white border border-gray-300 shadow-lg shadow-gary-500 rounded-xl">
              <p className="w-full md:text-2xl font-semibold text-black">Dark variant</p>
              <p className="w-full md:text-md font-semibold text-gray-400">Dark variant Dark variantDark variantDark variantDark variantDark variantDark variantDark variantDark variant</p>
              <p className="w-full  font-semibold text-base tracking-wide leading-tight text-gray-600">
               <strong> Shipper Name : </strong>{order.fullName}
              </p>
              <p className="w-full pb-4 font-semibold text-base  tracking-wide leading-tight text-gray-600">
                <strong>Receiving location:</strong> {order.receivingLocation}
              </p>
              <div className="rounded mx-auto text-center">
                <div className="opacity-95 border rounded-3xl bg-my-green hover:bg-teal-500 px-4">
                  <button className="text-sm font-medium leading-normal text-white py-2">
                    More Details
                  </button>
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
