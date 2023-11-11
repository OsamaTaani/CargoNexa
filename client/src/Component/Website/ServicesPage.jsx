import React, { useState } from 'react';
import '../CSS/services.css';

const ServicesPage = () => {

  return (
    <>
      {/* HERO SECTION  */}
      <div className="relative bg-cover bg-center h-[40rem] mb-32" style={{ backgroundImage: 'url("https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">Services Page</h1>
                        <p className="text-lg sm:text-xl md:text-2xl">Discover our innovative solutions to your problems.</p>
                    </div>
                </div>
            </div>
            {/* END HERO SECTION  */}


            {/* Cards SECTION  */}
  <div
    aria-label="Related Articles"
    className="mx-auto mt-10 max-w-screen-xl py-20"
  >
    <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">
      OUR SERVICES
    </h2>
    <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
      <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
        <a href="#">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="h-56 w-full object-cover"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              Branding
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              How to perform NPS Surveys
            </h3>
            <p className="mb-4 text-base font-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              tempore officiis. Lorem, ipsum dolor.
            </p>
            <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
              Read Now
            </span>
          </div>
        </a>
      </article>
      <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
        <a href="#">
          <img
            src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="h-56 w-full object-cover"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              Public Relations
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              Understanding Public Relations
            </h3>
            <p className="mb-4 text-base font-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              tempore officiis. Lorem, ipsum dolor.
            </p>
            <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
              Read Now
            </span>
          </div>
        </a>
      </article>
      <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
        <a href="#">
          <img
            src="https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="h-56 w-full object-cover"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              Marketing
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              Marketing is looking for untapped opportunities
            </h3>
            <p className="mb-4 text-base font-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              tempore officiis. Lorem, ipsum dolor.
            </p>
            <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
              Read Now
            </span>
          </div>
        </a>
      </article>
      <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
        <a href="#">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="h-56 w-full object-cover"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              Branding
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              How to perform NPS Surveys
            </h3>
            <p className="mb-4 text-base font-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              tempore officiis. Lorem, ipsum dolor.
            </p>
            <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
              Read Now
            </span>
          </div>
        </a>
      </article>
      <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
        <a href="#">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="h-56 w-full object-cover"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              Branding
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              How to perform NPS Surveys
            </h3>
            <p className="mb-4 text-base font-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              tempore officiis. Lorem, ipsum dolor.
            </p>
            <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
              Read Now
            </span>
          </div>
        </a>
      </article>
      <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
        <a href="#">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="h-56 w-full object-cover"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              Branding
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              How to perform NPS Surveys
            </h3>
            <p className="mb-4 text-base font-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              tempore officiis. Lorem, ipsum dolor.
            </p>
            <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
              Read Now
            </span>
          </div>
        </a>
      </article>
    </div>
    <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">
     Pagination here ........
    </h2>
       
  </div>
            {/* END Cards SECTION  */}

</>


  );
};

export default ServicesPage;
