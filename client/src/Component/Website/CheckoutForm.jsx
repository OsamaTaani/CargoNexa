
// import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import React from "react";
// import CardSection from "./CardSection";
// import axios from "axios";
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function CheckoutForm({stripe, elements,price}){
//   useEffect
//   (() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const navigate= useNavigate();
// //     const stripe = useStripe();

// //   const elements = useElements();

//   const handleSubmit = async event => {
//     event.preventDefault();

   

//     // const { stripe, elements } = props;
//     if (!stripe || !elements) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: elements.getElement(CardElement),
//       });


//     const card = elements.getElement(CardElement);
//     const result = await stripe.createToken(card);
//     if (result.error) {
//       console.log(result.error.message);
//     } else {
//       console.log(result.token);
//     } 

// //handle amount
//     const { id } = paymentMethod;
//     const response = await axios.post("http://localhost:3001/payment", {
//       amount: price.shippingPrice,
//       id,
//     });

//     if (response.data.success) {
//       try {
//         // setSuccess(true);
//         console.log("goooood");
// } catch (error) {console.log(error);}
// };}

// const handleBuyClick=()=>{
//   Swal.fire({
//     icon: 'success',
//     title: 'Order Successful!',
//     text: 'Thank you for your order.',
//     timer: 2000,

//   });
//   setTimeout(() => {
//     navigate('/');
//   }, 1500);
// }
//     return (
//       <div className="grid grid-cols-2 mx-4 md:mx-20 gap-5 md:gap-40 mt-20 ">
// <div>
//   <h1 className="text-center  text-gray-600 font-bold md:text-2xl mb-2 "> Order Summary</h1>
// <div className="border-2 border-gray-300 shadow-md shadow-gray-300  rounded-lg mb-80 p-5 h-80">
//         <div class="product-info ">
//           <h3 className="product-title">Apple MacBook Pro</h3>
//           <h4 className="product-price">$999</h4>
//         </div>
//         </div>
//       </div>

//       <div>
//       <h1 className="text-center font-bold   text-gray-600 md:text-2xl mb-2">Checkout</h1>
//       <div className="border-2 border-gray-300 shadow-md shadow-gray-300 rounded-lg mb-80 p-5 px-10 h-80 ">
        
//       <div className="mt-4 p-4">
//   <div className="">
//     <div className="my-3">
//       <input
//         type="text"
//         className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
//         placeholder="Card holder"
//         maxLength={22}
//         x-model="cardholder"
//       />
//     </div>
   
//   </div>
// </div>

//         <form  onSubmit={handleSubmit}>
//           <CardSection/>
//           <div className="flex justify-center mt-7">
//           <button className="btn-pay bg-orange-400 text-white px-3 py-1 rounded-lg " onClick={handleBuyClick} >Buy Now</button>
//           </div>
//         </form>
     

 
// </div>

//       </div>


//       </div>
//     );

// }
// export default CheckoutForm





import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React from "react";
import CardSection from "./CardSection";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CheckoutForm({stripe, elements,price}){
  useEffect
  (() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate= useNavigate();
//     const stripe = useStripe();

//   const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

   

    // const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    } 
//handle amount
    const { id } = paymentMethod;
    console.log('price before stripe ',price.shippingPrice)
    const response = await axios.post("http://localhost:3001/payment", {
      
      amount: price.shippingPrice,
      id,
    });
    console.log('price after stripe ',price.shippingPrice)

    if (response.data.success) {
      try {
        // setSuccess(true);
        console.log("goooood");
} catch (error) {console.log(error);}
};}

// const handleBuyClick=()=>{
//   Swal.fire({
//     icon: 'success',
//     title: 'Order Successful!',
//     text: 'Thank you for your order.',
//     timer: 2000,

//   });
//   setTimeout(() => {
//     navigate('/');
//   }, 1500);

//  axios.post("http://localhost:3002/payment", {
//       amount: price.shippingPrice,
//       type:"card"
//     });
// }

const handleBuyClick = () => {
  // Show success message using Swal
  Swal.fire({
    icon: 'success',
    title: 'Order Successful!',
    text: 'Thank you for your order.',
    timer: 1000,
  });

  // Delay navigation for a smoother user experience
  setTimeout(() => {
    // Uncomment the axios.post request to send payment information
    axios.post("http://localhost:3006/payment", {
      amount: price.shippingPrice,
      type: "card"
    })
    .then(response => {
      // Handle the response if needed
      console.log(response);

      // Navigate after successful payment
      navigate('/');
    })
    .catch(error => {
      // Handle errors if needed
      console.error(error);

      // Still navigate even if there's an error (adjust as needed)
      navigate('/');
    });
  }, 1500);
}


    return (
      <div className="grid grid-cols-2 mx-4 md:mx-20 gap-5 md:gap-40 mt-20 ">
<div>
  <h1 className="text-center  text-gray-600 font-bold md:text-2xl mb-2 "> Order Summary</h1>
<div className="border-2 border-gray-300 shadow-md shadow-gray-300  rounded-lg mb-80 p-5 h-80">
        <div class="product-info ">
          <h3 className="product-title">Apple MacBook Pro</h3>
          <h4 className="product-price">$999</h4>
        </div>
        </div>
      </div>

      <div>
      <h1 className="text-center font-bold   text-gray-600 md:text-2xl mb-2">Checkout</h1>
      <div className="border-2 border-gray-300 shadow-md shadow-gray-300 rounded-lg mb-80 p-5 px-10 h-80 ">
        
      <div className="mt-4 p-4">
  <div className="">
    <div className="my-3">
      <input
        type="text"
        className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
        placeholder="Card holder"
        maxLength={22}
        x-model="cardholder"
      />
    </div>
   
  </div>
</div>

        <form  onSubmit={handleSubmit}>
          <CardSection/>
          <div className="flex justify-center mt-7">
          <button className="btn-pay bg-orange-400 text-white px-3 py-1 rounded-lg " onClick={handleBuyClick} >Buy Now</button>
          </div>
        </form>
     

 
</div>

      </div>


      </div>
    );

}
export default CheckoutForm