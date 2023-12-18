import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import { useCookies } from 'react-cookie';


const CreateOrder = () => {

  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  const [showForm, setShowForm] = useState(true); // State to manage form visibility
  const [step, setStep] = useState(1); // Add state for tracking the step

  // Check if location.state exists before accessing its properties
  const { state } = location || {};
  const { title, description } = state || {};


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // State to hold form data
  const [formData, setFormData] = useState({
    order_title: state ? state.title : '', // Set the initial value from props
    order_description: state ? state.description : '', // Set the initial value from props
    name: '',
    receiver_name: '',
    order_phone_number: '',
    receiver_phone_number: '',
    shipping_location: '',
    receiving_location: '',
    shipping_date: '',
    order_truck_size: '',
    reciving_timestamp: '',
    shipping_timestamp: '',
    message: '',
    status: ''
  });

  // const [cookies] = useCookies(['token']); // Replace with your actual token cookie name
  const [errors, setErrors] = useState({});


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
      
    }));
    setErrors({ ...errors, [name]: '' }); // Clear previous error when input changes


  };

  const validatePhoneNumber = (phoneNumber) => {
    // Basic example: Validate that the phone number starts with '+962' and contains only numbers
    const phoneRegex = /^\+962\d+$/;

    return phoneRegex.test(phoneNumber);
  };

  // Handle form submission
  const handleCashClicked = async (e) => {
  
    const formDataWithPriceAndType = {
      ...formData,
      amount: shippingPrice,
      payment_method: 'cash', // Change this based on your logic for payment type
    };
    console.log("formDataWithPriceAndType",formDataWithPriceAndType);
    try {
      // Make a POST request using Axios
      // const authToken = cookies['token'];
      const response = await axios.post('http://localhost:3001/create', formDataWithPriceAndType, {
        // headers: { 
        //   Authorization: `${authToken}`,
        // },
        amount: shippingPrice,
        payment_method: 'cash',
      });
      Swal.fire({
            icon: 'question',
            title: 'Confirm',
            text: `Are you sure you want to proceed to payment? Total amount: ${shippingPrice}`,
            showCancelButton: true,
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'No, cancel',
          }).then((confirmResult) => {
            // Check if the user clicked the confirm button
            if (confirmResult.isConfirmed) {
              // Show success message using Swal
              Swal.fire({
                icon: 'success',
                title: 'Order Successful!',
                text: 'Thank you for your order.',
                timer: 1000,
              }).then(() => {
                navigate('/');
      
                // Uncomment the axios.post request to send cash payment information
                axios.post("http://localhost:3002/payment", {
                  amount: shippingPrice,
                  payment_type: "cash"
                })
                .then(response => {
                  // Handle the response if needed
                  console.log(response);
        
                  // Navigate after successful payment
                })
                .catch(error => {
                  // Handle errors if needed
                  console.error(error);
        
                  // Still navigate even if there's an error (adjust as needed)
                  navigate('/');
                });

          }) } })
    
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error('Error:', error);

    }

  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate phone numbers
    const orderPhoneNumberValid = validatePhoneNumber(formData.order_phone_number);
    const receiverPhoneNumberValid = validatePhoneNumber(formData.receiver_phone_number);

    // Set errors based on validation results
    setErrors({
      order_phone_number: orderPhoneNumberValid ? '' : 'Invalid phone number format',
      receiver_phone_number: receiverPhoneNumberValid ? '' : 'Invalid phone number format',
    });

     // Check if phone number validation failed
 if (!orderPhoneNumberValid || !receiverPhoneNumberValid) {
   return; // Prevent form submission
 }
    // Continue with form submission if all validations pass
   // Check if the containsDangerousMaterials checkbox is checked
   if (!formData.contains_dangerous_materials) {
     // Display an error message using SweetAlert
     Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Please check the "containsDangerousMaterials" checkbox.',
     });
     return; // Prevent form submission
   }

    setStep(2)
    setShowForm(false);
    window.scrollTo(0, 0);

  }

  // Function to reset form data
  const resetForm = () => {
    setFormData({
      order_title: '',
      order_description: '',
      name: '',
      receiver_name: '',
      order_phone_number: '',
      receiver_phone_number: '',
      shipping_location: '',
      receiving_location: '',
      shipping_date: '',
      order_truck_size: '',
      shipping_timestamp: '',
      receiving_timestamp: '',
      message: '',
      contains_dangerous_materials: false,

    });
  }


  // CALCULATE THE PRICE OF THE ORDER *******************************************************************

  // State to hold the calculated price
  const [shippingPrice, setShippingPrice] = useState(0);

  // Function to calculate the shipping price based on selected governorates and truck size
  const calculateShippingPrice = (shippingLocation, receivingLocation, truckSize) => {
    // Define base prices and added prices for each truck size
    const basePrices = {
      Small: 5,
      Medium: 10,
      Large: 20
    };

    const addedPrices = {
      Small: 6,
      Medium: 8,
      Large: 12
    };

    // Map governorates to their respective order
    const governorateOrder = [
      'Irbid', 'Ajloun', 'Jerash', 'Mafraq', 'Balqa', 'Amman',
      'Zarqa', 'Madaba', 'Karak', 'Tafilah', 'Ma\'an', 'Aqaba'
    ];

    // Find the indices of the selected governorates
    const shippingIndex = governorateOrder.indexOf(shippingLocation);
    const receivingIndex = governorateOrder.indexOf(receivingLocation);

    // Calculate the price based on the difference in indices
    const priceDifference = Math.abs(shippingIndex - receivingIndex);
    const basePrice = basePrices[truckSize] || 0;
    const addedPrice = addedPrices[truckSize] || 0;
    const calculatedPrice = basePrice + priceDifference * addedPrice;

    setShippingPrice(calculatedPrice);
  };

  // Update the shipping price whenever the shipping, receiving location, or truck size changes
  useEffect(() => {
    calculateShippingPrice(formData.shipping_location, formData.receiving_location, formData.order_truck_size);
  }, [formData.shipping_location, formData.receiving_location, formData.order_truck_size]);

  // const handleCashClicked = () => {
  //   // Display a confirmation dialog using SweetAlert
  //   Swal.fire({
  //     icon: 'question',
  //     title: 'Confirm',
  //     text: `Are you sure you want to proceed to payment? Total amount: ${shippingPrice}`,
  //     showCancelButton: true,
  //     confirmButtonColor: '#4CAF50',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, proceed!',
  //     cancelButtonText: 'No, cancel',
  //   }).then((confirmResult) => {
  //     // Check if the user clicked the confirm button
  //     if (confirmResult.isConfirmed) {
  //       // Show success message using Swal
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Order Successful!',
  //         text: 'Thank you for your order.',
  //         timer: 1000,
  //       }).then(() => {
  //         navigate('/');

  //         // Uncomment the axios.post request to send cash payment information
  //         axios.post("http://localhost:3002/payment", {
  //           amount: shippingPrice,
  //           payment_type: "cash"
  //         })
  //         .then(response => {
  //           // Handle the response if needed
  //           console.log(response);
  
  //           // Navigate after successful payment
  //         })
  //         .catch(error => {
  //           // Handle errors if needed
  //           console.error(error);
  
  //           // Still navigate even if there's an error (adjust as needed)
  //           navigate('/');
  //         });
  //       });
  //     }
  //   });
  // };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: "\n  * {\n  font-family: 'Source Sans Pro'; \n  } \n"
        }}
      />


      <section className="mx-auto max-w-screen-lg rounded-xl bg-white border-gray-400 text-gray-600 shadow-lg sm:my-10 sm:border">
        <div className="container mx-auto flex flex-col flex-wrap px-5 pb-12">
          <div className="bg-white mx-auto mt-4 mb-10 flex w-full flex-wrap items-center space-x-4 py-4 md:mb-20 md:justify-center md:px-10">
            <span className={`h-8 w-8 items-center justify-center rounded-full ${step === 1 ? 'bg-my-green' : 'bg-my-green'} text-white shadow md:inline-flex`}>
              1
            </span>
            <span className={`${step === 1 ? 'text-teal-500' : 'text-my-green'} md:inline`}>shipment details</span>
            <span className="hidden h-0.5 w-10 bg-teal-400 md:inline" />
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 2 ? 'bg-my-green' : 'bg-gray-600'} text-white shadow`}>
              2
            </span>
            <span className={`font-semibold ${step === 2 ? 'text-my-green' : 'text-gray-600'} md:inline`}>payment option</span>

            {/* ... (rest of your code) */}
          </div>

          {showForm ? (

            <div className="flex w-full flex-col">
              <form >
                <h1 className="text-2xl font-semibold">{formData.order_title}</h1>
                <p className="mt-2 text-gray-500">
                  {formData.order_description}
                </p>

                <div className="mt-4 grid items-center gap-3 gap-y-5 sm:grid-cols-2">
                  <div className="flex flex-col ">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Name
                    </label>
                    <input
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="name"
                      id="fullName"
                      type='text'
                      placeholder='Ahmad'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Receiver Name
                    </label>
                    <input
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="receiver_name"
                      id="receiverName"
                      type='text'
                      placeholder='Sara'
                      value={formData.receiver_name}
                      onChange={handleInputChange}
                      required
                    />

                  </div>
                  <div className="flex flex-col ">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      phone number
                    </label>
                    <input
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="order_phone_number"
                      id="phoneNumber"
                      type='text'
                      placeholder='+962'
                      value={formData.order_phone_number}
                      onChange={handleInputChange}
                      required
                    />
                  {errors.order_phone_number && (
                            <p className="text-red-500 text-sm ml-3">{errors.order_phone_number}</p>
                          )}
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Receiver phone number
                    </label>
                    <input
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="receiver_phone_number"
                      id="receiverPhoneNumber"
                      type='text'
                      placeholder='+962'
                      value={formData.receiver_phone_number}
                      onChange={handleInputChange}
                      required
                    />
                  {errors.receiver_phone_number && (
                          <p className="text-red-500 text-sm ml-3">{errors.receiver_phone_number}</p>
                        )}

                  </div>
                  <div className="flex flex-col ">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Shipping location
                    </label>
                    <select
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="shipping_location"
                      id="shippingLocation"
                      value={formData.shipping_location}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Governorate</option>
                      <option value="Irbid">Irbid</option>
                      <option value="Ajloun">Ajloun</option>
                      <option value="Jerash">Jerash</option>
                      <option value="Mafraq">Mafraq</option>
                      <option value="Balqa">Balqa</option>
                      <option value="Amman">Amman</option>
                      <option value="Zarqa">Zarqa</option>
                      <option value="Madaba">Madaba</option>
                      <option value="Karak">Karak</option>
                      <option value="Tafilah">Tafilah</option>
                      <option value="Ma'an">Ma'an</option>
                      <option value="Aqaba">Aqaba</option>
                    </select>
                  </div>

                  <div className="col-span-1 flex flex-col">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Receiving location
                    </label>
                    <select
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="receiving_location"
                      id="receivingLocation"
                      value={formData.receiving_location}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Governorate</option>
                      <option value="Irbid">Irbid</option>
                      <option value="Ajloun">Ajloun</option>
                      <option value="Jerash">Jerash</option>
                      <option value="Mafraq">Mafraq</option>
                      <option value="Balqa">Balqa</option>
                      <option value="Amman">Amman</option>
                      <option value="Zarqa">Zarqa</option>
                      <option value="Madaba">Madaba</option>
                      <option value="Karak">Karak</option>
                      <option value="Tafilah">Tafilah</option>
                      <option value="Ma'an">Ma'an</option>
                      <option value="Aqaba">Aqaba</option>
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Shipping Date
                    </label>
                    <input
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="shipping_date"
                      id="shippingDate"
                      type='date'
                      value={formData.shipping_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Truck Size
                    </label>
                    <select
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="order_truck_size"
                      id="truckSize"
                      value={formData.order_truck_size}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="Small">Small Truck (1 ton)</option>
                      <option value="Medium">Medium Truck (3-5 ton)</option>
                      <option value="Large">Large Truck (8-12 ton)</option>
                    </select>
                  </div>

                  <div className="flex flex-col ">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Shipping Time            </label>
                    <input
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="shipping_timestamp"
                      id="shippingTime"
                      type='time'
                      value={formData.shipping_timestamp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <label
                      className="text-md font-semibold  text-gray-500"
                      htmlFor=""
                    >
                      Receiver Time
                    </label>
                    <input
                      className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                      name="receiving_timestamp"
                      id="receiving_timestamp"
                      type='time'
                      value={formData.receiving_timestamp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* <div className="col-span-1 flex flex-col">
            <label
              className="text-md font-semibold  text-gray-500"
              htmlFor=""
            >
              Shipment Image 
            </label>
            <input
                className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring "
                name="Image"
                id="Image"
                type='file'
                value={formData.Image}
                onChange={handleInputChange}
                 required
              />
          </div>
        */}
                  <div className="col-span-1 flex flex-col">
                    <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                      Message
                    </label>
                    <input
                      className="rounded-lg border px-2 py-2 md:px-5 md:py-5 shadow-sm outline-none focus:ring"
                      name="message"
                      id="message"
                      type='text'
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>


                </div>
                <br />

                <label className="mb-4 flex items-center" htmlFor="">
                  <input
                    className="accent-blue-700 mr-3 h-5 w-5"
                    type="checkbox"
                    name="contains_dangerous_materials"
                    id="containsDangerousMaterials"
                    checked={formData.contains_dangerous_materials}
                    onChange={handleInputChange}

                  />
                  The shipment does not contain any dangerous materials or foodstuffs!
                </label>

                <div> hiiii {shippingPrice}</div>
                <div className="flex flex-col justify-between sm:flex-row">

                  {/* <Link to={'/NewOrders'}> */}
                  <button type='button' onClick={handleSubmit}  className="group my-2 flex w-full items-center justify-center rounded-lg bg-my-green py-2 text-center font-bold text-white outline-none transition sm:order-1 sm:w-40 focus:ring">
                    Continue
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:translate-x-2 ml-4 h-4 w-4 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                  {/* </Link> */}
                  <button className="group order-1 my-2 flex w-full items-center justify-center rounded-lg bg-gray-200 py-2 text-center font-bold text-gray-600 outline-none transition sm:w-40 focus:ring hover:bg-gray-300"
                    onClick={() => resetForm()}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>

          ) : (
            <section className="my-8 sm:my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 p-6">
              <div className="flex flex-col justify-center">
                <div className="flex h-full bg-card dark:bg-card-dark shadow rounded-lg  p-6 xl:p-8 mt-3 bg-my-green">

                  <div>
                    <svg class="text-white w-7 h-7 md:w-12 md:h-12 mr-5 "
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>

                    <h4 className=" font-semibold  md:text-3xl text-white leading-tight" onClick={handleCashClicked}>Cash On Delivery</h4>

                  </div>

                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex h-full bg-card dark:bg-card-dark shadow  rounded-lg  p-6 xl:p-8 mt-3 bg-my-green">
                  <div>
                    <svg class="w-7 h-7 md:w-12 md:h-12 text-white mr-5"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>

                  </div>
                  <Link to={{ pathname: '/payment' }} state={{ price: {shippingPrice} , formData : {formData}}} >
                    <h4 className="font-semibold md:text-3xl text-white leading-tight">Pay By Card  </h4>
                  </Link>

                </div>
              </div>
            </section>

          )}
        </div>
      </section>
    </>

  )
}


export default CreateOrder