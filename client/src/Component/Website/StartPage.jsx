import React from 'react'
import manWriteOnBox from '../Images/manWriteOnBox.webp'
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div className="flex w-screen flex-wrap text-slate-800 mb-20">

  <div className="relative hidden h-[50rem] bg-cover bg-center  select-none flex-col justify-center md:flex md:w-1/2" style={{ backgroundImage: 'url("https://images.pexels.com/photos/6169057/pexels-photo-6169057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
    <div className="py-16 px-8 text-white xl:w-[40rem]">
     
      <p className="my-6 text-3xl font-semibold leading-10">
        Create animations with{" "}
        <span className="whitespace-nowrap py-2 text-[#219C90]">
          drag and drop
        </span>
        .
      </p>
      <p className="mb-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
        necessitatibus nostrum repellendus ab totam.
      </p>
     
    </div>
   
  </div>
  <div className="flex w-full flex-col md:w-1/2">
    
    <div className="my-auto mx-auto flex flex-col justify-center pt-8 md:justify-start lg:w-[34rem]">
      <div className="flex w-full flex-col rounded-2xl bg-white px-2 sm:px-14">
        <h2 className="font-serif text-2xl font-semibold text-black ">
        Let's get started!<br/> 
        <span className='text-xl '>Determine which type of user best fits your role.</span>
        </h2>
        <div className="mt-8 flex w-full flex-col pb-8">
          <div className="relative mb-4">
            <input
              className="peer hidden"
              id="radio_1"
              type="radio"
              name="radio"
              defaultChecked=""
            />
            <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900" />
            <label
              className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-white p-4 pr-8 sm:pr-16"
              htmlFor="radio_1"
            >
              <span className="mb-2 text-lg font-bold text-black">Shipper</span>
              <p className="text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                mollitia corporis non fugiat ratione.
              </p>
            </label>
          </div>
          <div className="relative mb-4">
            <input
              className="peer hidden"
              id="radio_2"
              type="radio"
              name="radio"

            />
            <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900" />
            <label
              className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-white p-4 pr-8 sm:pr-16"
              htmlFor="radio_2"
            >
              <span className="mb-2 text-lg font-bold text-black">Driver</span>
              <p className="text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                mollitia corporis non fugiat ratione.
              </p>
            </label>
          </div>
          <div className="my-4 space-y-3">
            <label htmlFor="terms" className="flex space-x-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-6 w-6 shrink-0 accent-gray-900"
                defaultChecked=""
              />
              <span id="terms-description" className="text-sm text-gray-600">
                I agree to the{" "}
                <a className="underline" href="#">
                  Terms and Conditions
                </a>
                . Learn about our Privacy Policy and our measures to keep your
                data safe and secure.
              </span>
            </label>
          </div>
          <Link to={'/registration'}><button className="my-2 flex items-center justify-center rounded-md bg-[#219C90] py-3 w-32 font-medium text-white">
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-4 h-4 w-4"
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
          </button></Link>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default StartPage