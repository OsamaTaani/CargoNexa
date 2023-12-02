import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo3 from '../../Images/logo3.png';
import logo4 from '../../Images/logo4-transformed.png'
import ProfileSideBar from './ProfileSideBar';
import { useAuth } from '../AuthContext';
import LanguageSwitcher from '../../../LanguageSwitcher';
const Header = () => {
  const { isLoggedIn, logout, isRegistered } = useAuth();

  const [isDropDownOpen, setIsDropDowOpen] = useState(false);
  const toggleMenu = () => {
    setIsDropDowOpen(!isDropDownOpen);
  }




  return (

<nav className="relative flex items-center justify-between sm:h-5 md:justify-center sm:py-10 px-4 lg:mx-4 mt-2 border-b border-gray-300">
  <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0 ">
    <div className="flex items-center justify-between w-full md:w-auto">
      <a href="" aria-label="Home">
        <img
          src={logo4}
          className='h-20 w-40'

        />
      </a>
      <div className="-mr-2 flex items-center md:hidden">
        <button
          type="button"
          id="main-menu"
          aria-label="Main menu"
          aria-haspopup="true"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
        >
          <svg
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div className="hidden md:flex md:space-x-3 xl:space-x-10">
    <Link 
    to={'/'}
      className=" group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-sm md:text-xl"
    >
      Home
      <div className="w-0 group-hover:w-full h-1 bg-orange-400 ease-out-in duration-500  "></div>

    </Link>
    <Link 
    to={'/services'}
      className="group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-sm md:text-xl"
    >
      Services 
      <div className="w-0 group-hover:w-full h-1 bg-orange-400 ease-out-in duration-500  "></div>


    </Link>
   
    <Link 
    to={'/about'}
      className="group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-sm md:text-xl"
    >
     Our Mission
      <div className="w-0 group-hover:w-full h-1 bg-orange-400 ease-out-in duration-500  "></div>

    </Link>
 
    <Link 
    to={'/orders'}
    
      className="group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-sm md:text-xl"
    >
      My Orders
      <div className="w-0 group-hover:w-full h-1 bg-orange-400 ease-out-in duration-500  "></div>

    </Link>



  </div> 

  
 
  
  <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0 text-sm md:text-xl">
 

  {!isRegistered ? ( 
    <div>
<div>
 <LanguageSwitcher />
 </div>
<div className='hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0 text-sm md:text-xl mr-10'>

<div className="mx-auto flex h-screen w-full items-center justify-center  py-20">

<div className="group relative cursor-pointer py-2">

  <div className="flex items-center justify-between space-x-2 bg-white md:px-4">


  <span  className=" menu-hover inline-flex lg:mx-1 items-center px-2 py-2 border border-transparent leading-6 font-medium text-[#219C90] hover:text-[#54beb3] focus:outline-none transition duration-150 ease-in-out"  >
      Login
  </span>

    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </span>
  </div>
  <div className="invisible absolute z-50 flex text-center w-full flex-col bg-my-green rounded-xl py-1 px-4 text-white shadow-xl group-hover:visible">
    < Link to={'/login'} className=" my-1 block border-b border-gray-300 py-1 font-semibold text-white hover:text-gray-200 md:mx-2">
   
     <p>Shipper</p> 
    </Link>
    <Link to={'/driverLogin'} className=" block py-1 font-semibold text-white hover:text-gray-200 md:mx-2">
     <p>Driver</p> 
    </Link>
    

  </div>
</div>
</div>

 
  <span className="inline-flex">
    <Link 
  to={'/start'}
      className="  inline-flex items-center px-2 py-2 border border-transparent leading-6 font-medium text-[#219C90] hover:text-[#54beb3] focus:outline-none transition duration-150 ease-in-out"
    >
      SignUp
    </Link>
  </span>

 
</div>

</div>
) : (

  <div className='flex'>

<div>
 <LanguageSwitcher />
 </div>
          <button
              onClick={logout}
              className="inline-flex items-center px-2 py-2 border border-transparent leading-6 font-medium text-[#219C90] hover:text-[#54beb3] focus:outline-none transition duration-150 ease-in-out"
            >
              Logout
            </button>

    <Link to={'/userProfile'}>
<svg class={`
       
text-teal-600 w-12 h-12 `}
xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 20 20" fill="currentColor">  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/></svg>
</Link>



</div>

  )}

  </div>

</nav>






  )
}

export default Header
