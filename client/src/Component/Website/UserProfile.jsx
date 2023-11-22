import React from 'react'
import bg from '../Images/bg.png'

const UserProfile = () => {
  return (
   <>
  
  {/* component */}
  
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
  />
  <div className="relative block h-500-px ">
    <div
      className="absolute  w-full h-96 bg-my-green"
      // style={{
      //   backgroundColor:
        // backgroundImage:

          // 'url("https://png.pngtree.com/background/20230525/original/pngtree-raleigh-port-trucks-for-moving-cargoes-at-night-picture-image_2728460.jpg")'
        // backgroundImage: `url(${bg})`,
      // }}
    >
     
    </div>
    <div
      className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
      style={{ transform: "translateZ(0px)" }}
    >
   
    </div>
  </div>
  <div className="relative py-16 bg-blueGray-200">
    <div className="container mx-auto px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-40">
        <div className="px-6 ">
          <div className='flex justify-center  '>
        <img
                  alt="..."
                  src="https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="shadow-xl rounded-full  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16  h-[150px] w-[150px] "
                /></div>
        
          <div className="text-center mt-28">
          <div class="flex  p-2 w-full justify-center">
      <button class="min-w-auto w-32 h-10 bg-my-green p-2 rounded-l-xl  transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold">
        My Info
      </button>
      
      <button class="min-w-auto w-32 h-10 bg-my-green p-2 rounded-r-xl  transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold">
      My Orders
      </button>
  </div>
            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
              Jenna Stones
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
              Los Angeles, California
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400" />
              University of Computer Science
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </p>
                <a href="#pablo" className="font-normal text-pink-500">
                  Show more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-6/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Made with{" "}
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
              >
                Notus JS
              </a>{" "}
              by{" "}
              <a
                href="https://www.creative-tim.com"
                className="text-blueGray-500 hover:text-blueGray-800"
                target="_blank"
              >
                {" "}
                Creative Tim
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</>

  
  )
}

export default UserProfile