import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuth } from '../AuthContext';
import Cookies from "js-cookie";


const Login = () => {

const {login}=useAuth()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate=useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const [error,setError]=useState(null);

    const [values,setValues]=useState({ user_email:'', user_password:''});
    // const [error,setError]=useState({});

    // Handle the change in inputs
    const handleInputs=(e)=>{
        setValues({...values, [e.target.name]: e.target.value}) ;       
       
    }
   // Handle submit for the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const errors = LogValidate(values);
    // setError(errors);

 
      try {
        // Make a POST request to your API endpoint
        const response = await axios.post('http://localhost:3001/users/login', values);

        // Check the response status code and handle it accordingly
        
          console.log('Login successful:', response.data);
          // Assuming the API returns a token
          Cookies.set("role",1)
      const token = response.data.token;
      

      login(token)
      // Set the token in a cookie
      // setCookie('token', token, { path: '/' });

          navigate("/");
          // window.location.reload(true);

      } catch (error) {
        // Handle network or other errors
        console.error('Login error:', error);
        setError(error.response.data.error)

      }
    
  };


  return (


<>
    
<div className=" mx-auto flex justify-center h-[45rem] max-w-lg flex-col md:max-w-none md:flex-row  md:pr-10 md:my-10 lg:my-10 my-96 ">

<div className=" max-w-md rounded-3xl bg-gradient-to-t from-[#219C90] via-[#219C90] to-[#42a399] px-4 py-20 text-white sm:px-10 md:m-6 md:mr-8 ">
<p className="mb-28 font-bold md:text-4xl tracking-wider">CargoNexa</p>
<p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug ">
  Welcome Back to <br /> CargoNexa
</p>
<p className="mb-28 leading-relaxed text-gray-200">
Welcome back! Log in to your account to track shipments, manage deliveries, and experience seamless shipping at your fingertips.</p>

</div>
<form onSubmit={handleSubmit} className=" px-4 py-20 ">
<h2 className="mb-2 text-3xl font-bold">Sign In</h2>
<Link to="/registration" className="mb-10 block font-bold text-gray-600">
  Create an account
</Link>

<p className="mb-1 font-medium text-gray-500">Email</p>
<div className="mb-4 flex flex-col">
  <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
    <input
      type="email"
      onChange={handleInputs}
      className="w-full border-gray-300 bg-white  md:pr-24 px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
      placeholder="Enter your email"
      name='user_email'
    />
  </div>
</div>
{(error !== null && error.includes("email"))&& <p className='text-red-500'>"email shouldn't be empty"</p>}

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
{(error !== null && error.includes("password"))&& <p className='text-red-500'>"password shouldn't be empty"</p>}
{(error !== null && error.includes("Password must be 8-16 characters long "))&& <p className='text-red-500'>"Password must be 8-16 characters long and include one number, and one special character."</p>}

<div>       
     {(error !== null && error.includes("Invalid credentials"))&& <p className='text-red-500'>"email or password not correct "</p>}
</div>

<button type='submit' className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-[#219C90] to-[#219C90] px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
  Login 
</button>

        <Link to={'/resetPassword'}>
          <div className='text-center font-bold'>Forget Password ?</div>
          </Link>
</form></div>


</>
  )
}

export default Login