
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuth } from '../AuthContext';
import Cookies from "js-cookie";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";


const Registration = () => {

const {register}=useAuth()
const navigate=useNavigate();

const [userGoogle, setUserGoogle] = useState([]);

const loginbygoogle = useGoogleLogin({
  onSuccess: (codeResponse) => setUserGoogle(codeResponse),
  onError: (error) => console.log("Login Failed:", error),
});

useEffect(() => {

  if (userGoogle.access_token) {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`
      )
      .then(async (res) => {

        try {
          const response = await axios.post(
            "http://localhost:3001/users/google",
            res.data
          );

          const token = response.data.token;

          if (token) {
            Registration(token);
            navigate("/");
          }

          // Rest of your code...
        } catch (error) {
        }
      })
      .catch((err) => console.log("Google User Info Error:", err.message));
  }
}, [userGoogle, navigate]);



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
      navigate('/login')
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
    <div className="text-center mt-4 flex flex-col items-center justify-center">
            <div className="font-medium mb-4">or </div>
            <button
              className="bg-transparent border border-blue text-blue py-2 px-3  text-md font-semibold flex gap-2"
              onClick={() => loginbygoogle()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="22"
                height="22"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#26577c"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M26,2c-12.69141,0 -23,10.30859 -23,23c0,12.69141 10.30859,23 23,23c9.91797,0 15.97266,-4.5625 19.125,-10.21875c3.15234,-5.65625 3.55078,-12.30078 2.59375,-16.84375l-0.1875,-0.78125h-0.78125l-20.75,-0.03125h-1v10.40625h11.4375c-1.72656,4 -5.24219,6.75 -10.4375,6.75c-6.78906,0 -12.28125,-5.49219 -12.28125,-12.28125c0,-6.78906 5.49219,-12.28125 12.28125,-12.28125c3.05078,0 5.82031,1.12891 7.96875,2.96875l0.71875,0.59375l6.84375,-6.84375l0.71875,-0.75l-0.75,-0.6875c-4.08594,-3.72266 -9.53906,-6 -15.5,-6zM26,4c5.07422,0 9.65234,1.85547 13.28125,4.84375l-4.8125,4.8125c-2.37891,-1.77734 -5.26953,-2.9375 -8.46875,-2.9375c-7.87109,0 -14.28125,6.41016 -14.28125,14.28125c0,7.87109 6.41016,14.28125 14.28125,14.28125c6.55078,0 11.26172,-4.01562 12.9375,-9.46875l0.40625,-1.28125h-12.34375v-6.40625l18.84375,0.03125c0.66406,4.03516 0.22266,9.82813 -2.46875,14.65625c-2.85937,5.125 -8.05469,9.1875 -17.375,9.1875c-11.61328,0 -21,-9.39062 -21,-21c0,-11.60937 9.38672,-21 21,-21z"></path>
                  </g>
                </g>
              </svg>
              Sign Up with Google
            </button>
          </div>


  </form></div>


    </>
  )
}

export default Registration