import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
//     <footer class=" footer bg-[#272829] dark:bg-gray-900 py-20  ">
//     <div class="w-full mx-auto max-w-screen-xl p-4 flex flex-wrap items-center justify-between ">
//       <span class="text-xl text-white sm:text-center dark:text-white">© 2023 Jordan. All Rights Reserved.
//     </span>
//    <Link to={'/faq'}> 
//    <span class="text-xl text-white sm:text-center dark:text-white"> FAQ </span>
//    </Link>
//    <Link 
//     to={'/contact'}

//       className="group font-medium text-white  transition duration-150 ease-in-out text-sm md:text-xl"
//     >
//       Contact US


//     </Link>
//     <ul className='flex '>
//         <li>  <FontAwesomeIcon
//         icon={faFacebook}
//         className='text-white text-2xl mx-5 ' /> 
//         </li>

//         <li>
//         <FontAwesomeIcon
//         icon={faInstagram}
//         className='text-white text-2xl' />
//         </li>
      
//     </ul>
//     <ul class="flex md:flex-col  items-center mt-3 text-xl font-medium text-white dark:text-white sm:mt-0">
//         <li>
//             <a href="#" class="mr-4 hover:underline md:mr-6 ">phone : +96966366996</a>
//         </li>
//         <li>
//             <a href="#" class="mr-4 hover:underline md:mr-6">Email : JordanTrail@gmail.com</a>
//         </li>
        
       
//     </ul>
//     </div>
// </footer>
<>
  {/* component */}
  <div className="flex items-end w-full mt-40 bg-white">
    <footer className="w-full text-white bg-my-green body-font">
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-center md:flex-row md:flex-no-wrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
       <Link to={'/'}>
          <div className="flex items-center justify-center font-serif text-white text-xl md:text-2xl title-font md:justify-start">
          CargoNexa
          </div>
          </Link>
          <p className="mt-2 text-sm text-white">Website, For cargo Shipping !</p>
          <div className="mt-4">
            <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
              <a className="text-white cursor-pointer hover:text-gray-700">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a className="ml-3 text-white cursor-pointer hover:text-gray-700">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-white cursor-pointer hover:text-gray-700">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a className="ml-3 text-white cursor-pointer hover:text-gray-700">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </a>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
              About
            </h2>
            <nav className="mb-10 list-none">
              <Link to={'/about'}>
              <li className="mt-3">
                <a className="text-white cursor-pointer hover:text-white">
                  Our Mission
                </a>
              </li>
              </Link>
            </nav>
          </div>
       
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
              Platform
            </h2>
            <nav className="mb-10 list-none">
            
              <li className="mt-3">
                <Link to={'/faq'}>
                <a className="text-white cursor-pointer hover:text-white">
                  FAQ
                </a>
                </Link>
              </li>
            </nav>
          </div>

          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
              Contact
            </h2>
            <nav className="mb-10 list-none">
              <Link to={'/contact'}>
              <li className="mt-3">
                <a className="text-white cursor-pointer hover:text-gray-900">
                  Send a Message
                </a>
              </li>
              </Link>
              <li className="mt-3">
                <a className="text-white cursor-pointer hover:text-gray-900">
                  +123-456-7890
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-my-green border">
        <div className="container px-5 py-4 mx-auto">
          <p className="text-sm text-white capitalize xl:text-center">
            cargoNexa © 2020 All rights reserved{" "}
          </p>
        </div>
      </div>
    </footer>
  </div>
</>

  )
}

export default Footer