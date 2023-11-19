// Solutions.js
import React, { useEffect } from 'react';
import img1 from '../Images/box1.jpeg';
import manHoldBox from '../Images/manHoldBox.webp';
import truck from '../Images/truck.jpeg';
import map from '../Images/map.jpg';

const SolutionsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
<>
     {/* HERO SECTION  */}
    <div className="relative bg-cover bg-center h-[50rem]" style={{ backgroundImage: 'url("https://images.pexels.com/photos/6169641/pexels-photo-6169641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">Solutions Page</h1>
          <p className="text-lg sm:text-xl md:text-2xl">Discover our innovative solutions to your problems.</p>
        </div>
      </div>
    </div>
    {/* END HERO SECTION  */}
    
    {/* CARDS SECTION */}
  
    <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div class="max-w-lg">
                <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Tracking technology:</h2>
                <p class="mt-4 text-gray-600 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
                    eros at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis elit efficitur consequat.
                    Mauris eleifend velit a pretium iaculis. Donec sagittis velit et magna euismod, vel aliquet nulla
                    malesuada. Nunc pharetra massa lectus, a fermentum arcu volutpat vel.</p>
                <div class="mt-8">
                   
                </div>
            </div>
            <div class="mt-12 md:mt-0">
                <img src={manHoldBox} alt="About Us Image" class="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </div>


    
    <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div class="max-w-lg">
                <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Tracking technology:</h2>
                <p class="mt-4 text-gray-600 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
                    eros at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis elit efficitur consequat.
                    Mauris eleifend velit a pretium iaculis. Donec sagittis velit et magna euismod, vel aliquet nulla
                    malesuada. Nunc pharetra massa lectus, a fermentum arcu volutpat vel.</p>
                <div class="mt-8">
                   
                </div>
            </div>
            <div class="mt-12 md:mt-0">
                <img src={truck} alt="About Us Image" class="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </div>


    <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div class="max-w-lg">
                <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Tracking technology:</h2>
                <p class="mt-4 text-gray-600 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
                    eros at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis elit efficitur consequat.
                    Mauris eleifend velit a pretium iaculis. Donec sagittis velit et magna euismod, vel aliquet nulla
                    malesuada. Nunc pharetra massa lectus, a fermentum arcu volutpat vel.</p>
                <div class="mt-8">
                   
                </div>
            </div>
            <div class="mt-12 md:mt-0">
                <img src={map} alt="About Us Image" class="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </div>


  {/* END CARDS SECTION */}
</>
  );
};

export default SolutionsPage;




