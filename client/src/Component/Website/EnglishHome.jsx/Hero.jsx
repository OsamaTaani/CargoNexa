// {/* Navbar */}
// <nav
// className="relative flex w-full items-center justify-between bg-white py-2 shadow-sm shadow-neutral-700/10 dark:bg-neutral-800 dark:shadow-black/30 lg:flex-wrap lg:justify-start"
// data-te-navbar-ref=""
// >
// {/* Container wrapper */}
// <div className="flex w-full flex-wrap items-center justify-between px-6">
//   <div className="flex items-center">
//     {/* Toggle button */}
//     <button
//       className="block border-0 bg-transparent py-2 pr-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
//       type="button"
//       data-te-collapse-init=""
//       data-te-target="#navbarSupportedContentY"
//       aria-controls="navbarSupportedContentY"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span className="[&>svg]:w-7">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           className="h-7 w-7"
//         >
//           <path
//             fillRule="evenodd"
//             d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </span>
//     </button>
//     {/* Navbar Brand */}
//     <a className="text-primary dark:text-primary-400" href="#!">
//       <span className="[&>svg]:ml-2 [&>svg]:mr-3 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:lg:ml-0">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
//           />
//         </svg>
//       </span>
//     </a>
//   </div>
//   {/* Collapsible wrapper */}
//   <div
//     className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
//     id="navbarSupportedContentY"
//     data-te-collapse-item=""
//   >
//     {/* Left links */}
//     <ul className="mr-auto lg:flex lg:flex-row" data-te-navbar-nav-ref="">
//       <li data-te-nav-item-ref="">
//         <a
//           className="block py-2 pr-2 text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-600 focus:text-neutral-600 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 dark:disabled:text-white/30 lg:px-2 [&.active]:text-black/80 dark:[&.active]:text-white/80"
//           href="#!"
//           data-te-nav-link-ref=""
//           data-te-ripple-init=""
//           data-te-ripple-color="light"
//           disabled=""
//         >
//           Dashboard
//         </a>
//       </li>
//       <li data-te-nav-item-ref="">
//         <a
//           className="block py-2 pr-2 text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-600 focus:text-neutral-600 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 dark:disabled:text-white/30 lg:px-2 [&.active]:text-black/80 dark:[&.active]:text-white/80"
//           href="#!"
//           data-te-nav-link-ref=""
//           data-te-ripple-init=""
//           data-te-ripple-color="light"
//         >
//           Team
//         </a>
//       </li>
//       <li className="mb-2 lg:mb-0" data-te-nav-item-ref="">
//         <a
//           className="block py-2 pr-2 text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-600 focus:text-neutral-600 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 dark:disabled:text-white/30 lg:px-2 [&.active]:text-black/80 dark:[&.active]:text-white/80"
//           href="#!"
//           data-te-nav-link-ref=""
//           data-te-ripple-init=""
//           data-te-ripple-color="light"
//         >
//           Projects
//         </a>
//       </li>
//     </ul>
//     {/* Left links */}
//   </div>
//   {/* Collapsible wrapper */}
//   {/* Right elements */}
//   <div className="my-1 flex items-center lg:my-0 lg:ml-auto">
//     <button
//       type="button"
//       className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400 dark:hover:bg-neutral-700 dark:hover:bg-opacity-60 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
//       data-te-ripple-init=""
//       data-te-ripple-color="light"
//     >
//       Login
//     </button>
//     <button
//       type="button"
//       className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//       data-te-ripple-init=""
//       data-te-ripple-color="light"
//     >
//       Sign up for free
//     </button>
//   </div>
//   {/* Right elements */}
// </div>
// {/* Container wrapper */}
// </nav>
// {/* Navbar */}








import React from 'react';
import heroImage from '../../Images/heroImage.jpg';
import locationIcon from '../../Images/location.png'
import manHoldBox from '../../Images/manHoldBox.webp';

const Hero = () => {
    return (
        <>
            {/* Section: Design Block */}
          {/* <section className="md:mb-40">
            
               <div className=" py-12 text-center lg:my-12 lg:text-left">
                    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                        <div className="grid items-center gap-12 lg:grid-cols-2 ">
                            <div className="mt-12 lg:mt-0 ">
                                <h1 className="mb-8 sm:text-2xl text-2xl text-[#191D88] font-bold tracking-tight md:text-3xl xl:text-6xl text-center ">
                                    لوجستيات
                                    <br />
                                    <span className="text-primary">     موثوقة يمكنك الاعتماد عليها دائماً</span>
                                </h1>
                               
                                <div class='grid justify-center ml-32 md:ml-40 border border-[#191D88] shadow-lg  mt-10 w-[20rem] p-3'>
                                    <div class='font-bold'>تتبع شحنتك</div>
                                    <div class="flex mb-3 mt-3 text-sm w-60" style={{ borderBottom: "solid gray 2px" }}>
                                        <img src={locationIcon} alt="locationIcon" className="h-5 border-b-5" />
                                        <form>
                                            <input className='w-60 focus:outline-none' placeholder='ادخل رقم التتبع الخاص بشحنتك' />
                                        </form>
                                    </div>
                                    <button className='bg-[#FFC436] w-10 text-black rounded-lg p-1'>
                                        تتبع
                                    </button>
                                </div>
                            </div>
                            <div className="ml-9 mb-12 lg:mb-0 md:w-[20rem]  lg:w-[60rem] ">
                                <img
                                    src={heroImage}
                                    className='h-80 md:h-[30rem]   '
                                    id="hero-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
         
            </section> */}
            {/* Section: Design Block */}



            
            {/* HERO SECTION  */}
   
  <div className="relative mb-40" >
    <img
      src="https://images.pexels.com/photos/6169052/pexels-photo-6169052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      className="absolute inset-0 h-full w-full object-cover "
      alt=""
    />
    <div className="relative bg-black  bg-opacity-50">
      <svg
        className="absolute inset-x-0 -bottom-1 text-white  "
        viewBox="0 0 1160 163"
      >
        <path
          fill="currentColor"
          d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
        />
      </svg>
      <div className="relative mx-auto overflow-hidden px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16">
            <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
              Fundraising easier than ever
            </h2>
            <p className="mb-4 max-w-xl text-base text-gray-200 md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              laudantium rem molestiae.
            </p>
            <a
              href="/about"
              aria-label=""
              className="inline-flex items-center font-semibold tracking-wider text-teal-400 transition-colors duration-200 hover:text-teal-300"
            >
              Learn more
              <svg
                className="ml-2 inline-block w-3"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </a>
          </div>
          <div className="w-full max-w-xl xl:w-5/12 xl:px-8 mt-60">
            <div className="overflow-hidden rounded-xl border-t-4 border-[#219C90]  bg-white p-7 shadow shadow-emerald-300 sm:p-10">
              <h3 className="mb-4 text-xl font-bold text-[#219C90]  sm:mb-6 sm:text-center sm:text-2xl">
              Track your shipment
              </h3>
              <form>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor="firstName"
                    className="mb-1 inline-block font-medium text-[#219C90] "
                  >
                    Tracking ID
                  </label>
                  <input
                    placeholder="123"
                    required=""
                    type="text"
                    className="mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm ring-emerald-200 transition duration-200 focus:border-emerald-400 focus:outline-none focus:ring"
                    id="firstName"
                    name="firstName"
                  />
                </div>
              
                <div className="mt-4 mb-2 sm:mb-4">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#219C90]  px-6 font-medium tracking-wide text-white shadow-md ring-emerald-200 transition duration-200 hover:bg-[#53bbb1]  focus:outline-none focus:ring"
                  >
                    track
                  </button>
                </div>
             
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


            {/* END HERO SECTION  */}
        </>
    );
};

export default Hero;
