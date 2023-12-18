

import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import CheckoutForm from "../Website/CheckoutForm";
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';

const stripePromise = loadStripe('pk_test_51OGQ5sJlCMJqHMZePfpmiwsr8SeKyd6N8UOZobwBGPY0cHqUG9MvtOOlEUlTdxZfKhpNb7lyzO7BXVDwcifRLBoi006lDxNQEH');
const Payment = () => {
  const location = useLocation()
  const { price , formData} = location.state
console.log(price);
console.log(formData);
  const {isUserRole} = useAuth()
  const role = isUserRole() || Cookies.get('role')
  console.log("role in user ",role )

  useEffect(() => {
    console.log("location in payment page ",price);
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="product">
    {/* <img
      src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"
      alt="laptop"
      style={{ width: "50px", height: "50px" }}
    /> */}


    <div>
      
       
    <Elements stripe={stripePromise}>
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <CheckoutForm stripe={stripe} elements={elements} price={price}  formData={formData}/>
    )}
  </ElementsConsumer>
</Elements>

    </div>

    {role != 1 &&
   (<Navigate to="/login" replace/>)
  }
  </div>
  )
}

export default Payment