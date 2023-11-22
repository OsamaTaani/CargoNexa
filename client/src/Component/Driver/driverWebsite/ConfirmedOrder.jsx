import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ConfirmedOrder = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const { orderId } = useParams();
      const [orderDetails, setOrderDetails] = useState([]);
      
      useEffect(() => {
        // Fetch order details using Axios based on the order ID
        axios.get(`http://localhost:3001/order/${orderId}`)
       
          .then(response => {
            // Set the fetched order details to the state
            setOrderDetails(response.data);
          })
          .catch(error => {
            console.error('Error fetching order details:', error);
          });
      }, [orderId]);

      
  return (
   
 


<>
  {/* component */}
 
 
    <div className="relative block p-3 overflow-hidden rounded-lg ml-2 mr-2 sm:ml-0 sm:mr-0 xl:mt-20">
      <a
        className="relative block p-6 sm:p-8 overflow-hidden border bg-white border-gray-300 rounded-lg ml-2 mr-2 sm:ml-6 sm:mr-6"
        href=""
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-my-green via-orange-300 to-my-green" />
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-4 sm:mb-0">
            <h5 className="md:text-xl font-bold text-slate-900">
             {orderDetails.order_title}
            </h5>
            <p className="mt-1 text-xs font-medium text-slate-600">{orderDetails.order_description} </p>
          </div>
          <div className="flex-shrink-0 hidden sm:block">
            <img
              className="object-cover w-24 h-24 rounded-lg shadow-sm"
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
        </div>

         <div>
          <strong>
         Shipper Data
          </strong>
          <div className='bg-my-green h-1 w-28'></div>
        </div>
        <dl className="flex flex-col sm:flex-row mt-3 text-center">
          <div className="flex flex-col-reverse mb-2 sm:mb-0">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.full_name}</dt>
            <dd className="text-xs text-slate-500">Full Name</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600"> {orderDetails.receiver_name}</dt>
            <dd className="text-xs text-slate-500">Receiver Name</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.phone_number}</dt>
            <dd className="text-xs text-slate-500">Phone Number</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.receiver_phone_number}</dt>
            <dd className="text-xs text-slate-500">Receiver Phone Number</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.receiver_phone_number}</dt>
            <dd className="text-xs text-slate-500">Receiver Phone Number</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.receiver_phone_number}</dt>
            <dd className="text-xs text-slate-500">Receiver Phone Number</dd>
          </div>
        </dl>

        <div className='mt-5 '>
          <strong>
          Receiver Data
          </strong>
          <div className='bg-my-green h-1 w-28'></div>
        </div>

        <dl className="flex flex-col sm:flex-row mt-3 text-center">
          <div className="flex flex-col-reverse mb-2 sm:mb-0">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.full_name}</dt>
            <dd className="text-xs text-slate-500">Full Name</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600"> {orderDetails.receiver_name}</dt>
            <dd className="text-xs text-slate-500">Receiver Name</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.phone_number}</dt>
            <dd className="text-xs text-slate-500">Phone Number</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.receiver_phone_number}</dt>
            <dd className="text-xs text-slate-500">Receiver Phone Number</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.receiver_phone_number}</dt>
            <dd className="text-xs text-slate-500">Receiver Phone Number</dd>
          </div>
          <div className="flex flex-col-reverse ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">{orderDetails.receiver_phone_number}</dt>
            <dd className="text-xs text-slate-500">Receiver Phone Number</dd>
          </div>          

        </dl>
   

        <div className='font-bold text-right md:text-xl'>Totle : 20 JD</div>
        {/* Add the image here for small screens */}
        <div className="sm:hidden mt-4 ">
          <img
            className="object-cover w-full rounded-lg shadow-sm h-36"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
      </a>
    </div>
<>
  {/* status */}
  <div className="w-screen  flex items-center justify-center">
    <div className="w-full mx-auto py-16">
    <div className="text-center">
      <p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-gray-900 lg:text-2xl lg:leading-8">
        Track Your Shippment 
      </p>
    </div>
      {/* Outline */}
      <div className="bg-white px-6 py-4 my-3 w-3/4 mx-auto  flex items-center">
        <div className="w-full text-center mx-auto">
          <button
            type="button"
            className="border border-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
          >
              Shipping Soon
          </button>
          <button
            type="button"
            className="border border-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none  focus:outline-none focus:shadow-outline"
          >
             Shipped
          </button>
          <button
            type="button"
            className="border border-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
          >
              Out for Delivery
          </button>
          <button
            type="button"
            className="border border-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none  focus:outline-none focus:shadow-outline"
          >
            Delivered
          </button>
        
        </div>
      </div>
      {/* End Outline */}
    </div>
  </div>
</>

</>
  )
}

export default ConfirmedOrder