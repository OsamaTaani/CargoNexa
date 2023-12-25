
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuth } from '../AuthContext';

const Registration = () => {
const navigate=useNavigate();

const {register}=useAuth()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cookies, setCookie] = useCookies(['token']);
  const [error,setError]=useState(null);

const [values,setValues]=useState({ user_username:'' , user_email:'',user_phone_number:'', user_password:''});
// const [error,setError]=useState({});

// Handle the change in inputs
const handleInputs=(e)=>{
    setValues({...values, [e.target.name]: e.target.value}) ;       
   console.log("values",values)
}

// Handle submit for the form 
const handleSubmit = async (e) => {
    e.preventDefault();
    // const errors = RegValidate(values);
    // setError(errors);

    // Check if there are any validation errors before sending the data

    try {
      console.log("first")
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:3001/users/register', values)
        // Registration was successful
        console.log('Registration successful:', response.data);
   // Assuming the API returns a token
      const token = response.data.token;

      // Set the token in a cookie
      // setCookie('token', token, { path: '/' });\
      register(token)
      navigate('/')
    } catch (error) {
      // Handle network or other errors
      console.error('Registration error:', error);
      setError(error.response.data.error)

    }
  
}




  return (
   
    <>
    
    <div 
    className=" mx-auto flex justify-center h-[45rem] max-w-lg flex-col md:max-w-none md:flex-row  md:pr-10 md:my-10 lg:my-10 my-96 "
    >

  <div className=" max-w-md rounded-3xl bg-gradient-to-t from-[#219C90] via-[#219C90] to-[#42a399] px-4 py-20 text-white sm:px-10 md:m-6 md:mr-8 ">
  <p className="mb-28 font-bold md:text-4xl tracking-wider">CargoNexa</p>
    <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug ">
      Start your 
      shipping<br /> with us
    </p>
    <p className="mb-28 leading-relaxed text-gray-200">
    Embark on a journey with us! Sign up to create your account and unlock a world of efficient shipping. 
    Stay informed, track your cargo, and enjoy hassle-free deliveries.    </p>
  
  </div>
  <form onSubmit={handleSubmit} className=" px-4 py-20 ">
    <h2 className="mb-2 text-3xl font-bold">Registration</h2>
    <Link to="/login" className="mb-10 block font-bold text-gray-600">
      Have an account
    </Link>
   
    <p className="mb-1 font-medium text-gray-500">Username</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="text"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none md:pr-24"
          placeholder="Enter your username"
          name='user_username'
        />
      </div>
    </div>
    {(error !== null && error.includes("\"user_username\" is not allowed to be empty"))&& <p className='text-red-500'>"username shouldn't be empty"</p>}
    {(error !== null && error.includes("fails to match the required pattern: /^\\S*$/"))&& <p className='text-red-500'>"username shouldn't have any space"</p>}

    <p className="mb-1 font-medium text-gray-500">Email</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="email"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Enter your email"
          name='user_email'
        />
      </div>
    </div>
    {(error !== null && error.includes("email"))&& <p className='text-red-500'>"email shouldn't be empty"</p>}
    {(error !== null && error.includes("Email is already registered"))&& <p className='text-red-500'>"Email is already registered"</p>}

    <p className="mb-1 font-medium text-gray-500">Phone</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="text"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="enter your phone"
          name='user_phone_number'
        />
      </div>
    </div>
    {(error !== null && error.includes("\"user_phone_number\" is not allowed to be empty"))&& <p className='text-red-500'>"phone number shouldn't be empty"</p>}
    {(error !== null && error.includes("\"user_phone_number\" with value \"55\" fails to match the required pattern: /^(07\\d{8})$/"))&& <p className='text-red-500'>"phone number should start with (07) have 10 digits"</p>}

    <p className="mb-1 font-medium text-gray-500">Password</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="password"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Choose a password (minimum 8 characters)"
          name='user_password'
        />
      </div>
    </div>
    {(error !== null && error.includes("\"user_password\" is not allowed to be empty"))&& <p className='text-red-500'>"password shouldn't be empty"</p>} 
    {(error !== null && error.includes("\"user_password\" length must be at least 8 characters long"))&& <p className='text-red-500'>"password should have at least 8 characters 1 special character , 1 num "</p>}

    {/* <p className="mb-1 font-medium text-gray-500">Confirm Password</p> */}
    {/* <div className="mb-4 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="password"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Write the same password again"
          name='user_confirmpassword'
        />
      </div>
    </div>
    {error.user_confirmpassword && <p style={{color:"red"}}>{error.user_confirmpassword}</p>}
     */}
    <button type='submit' className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-[#219C90] to-[#219C90] px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
      Sign Up
    </button>
  </form></div>


    </>
  )
}

export default Registration