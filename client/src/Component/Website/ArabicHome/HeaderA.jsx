import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo3 from '../../Images/logo3.png';
import searchIcon from '../../Images/search.png'
const HeaderA = () => {
  const [isDropDownOpen, setIsDropDowOpen] = useState(false);
  const toggleMenu = () => {
    setIsDropDowOpen(!isDropDownOpen);
  }
  return (

    <nav class="bg-gray-100 text-blue-900 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">


        <div class="flex">
          <Link to="/registration"> <button type="button" class="ml-2 text-[#191D88] bg-[#FFC436] hover:bg-[#f1c357]  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">اطلب الان</button></Link>
          <Link to="/login"> <button type="button" class="text-[#191D88] font-medium  text-sm px-4 py-2 text-center mr-3 md:mr-0">تسجيل دخول</button></Link>
          {/* <img src={searchIcon} alt='searchIcon' className='h-5 mt-2 '/> */}
          <button onClick={toggleMenu} data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isDropDownOpen}>
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5"
              aria-hidden={!isDropDownOpen}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <Link to="/" class="flex items-center md:order-2">
          <img src={logo3} alt='logo' className='h-20' />
        </Link>
        <div class={`w-full md:block md:w-auto  ${isDropDownOpen ? 'block' : 'hidden'}`}>
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border text-xl rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 text-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            <li className="group ">
              <Link to="/contact" className="block py-2 pl-3 pr-4 text-blue-900 bg-blue-700 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                تواصل الان           
                     <div className="w-0 group-hover:w-full h-1 bg-[#FFC436] ease-out-in duration-500 absolute right-0 ">
                </div> </Link>
            </li>

            <li className="group ">
              <Link to="/about" className="block py-2 pl-3 pr-4 text-blue-900 bg-blue-700 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                من نحن
                <div className="w-0 group-hover:w-full h-1 bg-[#FFC436] ease-out-in duration-500 absolute right-0 ">
                </div> </Link>
            </li>
            <li className="group ">
              <Link to="/service" className="block py-2 pl-3 pr-4 text-blue-900 bg-blue-700 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                خدماتنا
                <div className="w-0 group-hover:w-full h-1 bg-[#FFC436] ease-out-in duration-500 absolute right-0 ">
                </div> </Link>
            </li>

            <li className="group ">
              <Link to="/" className="block py-2 pl-3 pr-4 text-blue-900 bg-blue-700 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                الرئيسية
                <div className="w-0 group-hover:w-full h-1 bg-[#FFC436] ease-out-in duration-500 absolute right-0 ">
                </div> </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>








  )
}

export default HeaderA