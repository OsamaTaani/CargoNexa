import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React from "react";
import CardSection from "./CardSection";
import axios from "axios";
function CheckoutForm({stripe, elements}){
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
    const response = await axios.post("http://localhost:3001/payment", {
      amount: 10 * 100,
      id,
    });

    if (response.data.success) {
      try {
        // setSuccess(true);
        console.log("goooood");
} catch (error) {console.log(error);}
};}

//   render() {
    return (
      <div>
        <div class="product-info">
          <h3 className="product-title">Apple MacBook Pro</h3>
          <h4 className="product-price">$999</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <CardSection/>
          <button className="btn-pay">Buy Now</button>
        </form>
      </div>
    );
//   }
}
export default CheckoutForm