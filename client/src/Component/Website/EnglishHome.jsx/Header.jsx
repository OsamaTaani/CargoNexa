import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo3 from '../../Images/logo3.png';
import logo4 from '../../Images/logo4-transformed.png'
const Header = () => {
  const [isDropDownOpen, setIsDropDowOpen] = useState(false);
  const toggleMenu = () => {
    setIsDropDowOpen(!isDropDownOpen);
  }
  return (



<nav className="relative flex items-center justify-between sm:h-10 md:justify-center py-10 px-4 lg:mx-4 mt-2 border-b border-gray-300">
  <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
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
  <div className="hidden md:flex md:space-x-10">
    <Link 
    to={'/'}
      className=" group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-2xl"
    >
      Home
      <div className="w-0 group-hover:w-full h-1 bg-[#219C90] ease-out-in duration-500  "></div>

    </Link>
    <Link 
    to={'/services'}
      className="group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-2xl"
    >
      Services 
      <div className="w-0 group-hover:w-full h-1 bg-[#219C90] ease-out-in duration-500  "></div>


    </Link>
    <Link 
    to={'/solutions'}
      className="group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-2xl"
    >
      Solutions  
      <div className="w-0 group-hover:w-full h-1 bg-[#219C90] ease-out-in duration-500  "></div>


    </Link>
    <Link 
    to={'/about'}
      className="group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-2xl"
    >
      About Us
      <div className="w-0 group-hover:w-full h-1 bg-[#219C90] ease-out-in duration-500  "></div>

    </Link>
    <Link 
    to={'/contact'}
      target="_blank"
      className="group font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out text-2xl"
    >
      Contact US
      <div className="w-0 group-hover:w-full h-1 bg-[#219C90] ease-out-in duration-500  "></div>

    </Link>
  </div> 
  <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0 text-2xl">
    <span className="inline-flex">
      <Link 
    to={'/login'}
        className=" inline-flex items-center px-4 py-2 border border-transparent leading-6 font-medium text-[#219C90] hover:text-[#54beb3] focus:outline-none transition duration-150 ease-in-out"
      >
        Login
      </Link>
    </span>
    <span className="inline-flex">
      <Link 
    to={'/start'}
        className="  inline-flex items-center px-4 py-2 border border-transparent leading-6 font-medium text-[#219C90] hover:text-[#54beb3] focus:outline-none transition duration-150 ease-in-out"
      >
        SignUp
      </Link>
    </span>
    <span className="inline-flex rounded-md shadow ml-2 ">
      <Link 
    to={'/order'}
        className="text-2xl inline-flex items-center px-5 py-3 border border-transparent  leading-6 font-medium rounded-3xl text-white bg-[#219C90] hover:bg-[#54beb3] focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
      >
        Quote Now
      </Link>
    </span>
  </div>
  
</nav>


  )
}

export default Header