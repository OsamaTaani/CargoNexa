// import React from 'react'
// import '../CSS/payment.css'
// const Payment = () => {
    
//   return (
//     <>
//    <div className="container">
//   <img
//     src="https://images.unsplash.com/photo-1488628075628-e876f502d67a?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg="
//     alt=""
//   />
//   <p className="title">card title</p>
//   <div className="overlay" />
//   <div className="button">
//     <a href="#"> BUTTON </a>
//   </div>
// </div>


//   </>
  
//   )
// }

// export default Payment

import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import CheckoutForm from "../Website/CheckoutForm";

const stripePromise = loadStripe('pk_test_51OGQ5sJlCMJqHMZePfpmiwsr8SeKyd6N8UOZobwBGPY0cHqUG9MvtOOlEUlTdxZfKhpNb7lyzO7BXVDwcifRLBoi006lDxNQEH');
const Payment = () => {
  return (
    <div className="product">
    <img
      src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"
      alt="laptop"
      style={{ width: "100%", height: "auto" }}
    />
    <div>
      
       
        <Elements stripe={stripePromise}>
        <ElementsConsumer>

      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
      </Elements>
      
    </div>
  </div>
  )
}

export default Payment