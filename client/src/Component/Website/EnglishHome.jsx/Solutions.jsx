import React, { useEffect, useState } from 'react';
import heroImage from '../../Images/heroImage.jpg';
import manHoldBox from '../../Images/manHoldBox.webp';
import truck from '../../Images/truck.jpeg';
import map from '../../Images/map.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Solutions = () => {
    const [solutionsData, setSolutionsData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/solutions')
        .then(response => {
          setSolutionsData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
        <div className='mb-20 md:mb-40'>
            <div>
                <span className="group font-extrabold text-xl md:text-2xl xl:text-3xl flex justify-start">
                    <Link to="/contact" className=" ml-20 block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 relative" aria-current="page">
                        Logistic Solutions
                        <div className="w-32 md:w-[17rem] h-1  bg-my-green"></div>
                    </Link>
                </span>
                <br />
                <span className="group text-sm md:text-xl xl:text-xl">
                    <Link to="/contact" className=" ml-10 md:ml-20 mb-5 block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 relative" aria-current="page">
                        From the farm to your fridge, or from the warehouse to your wardrobe, CargoNexa develops solutions that meet customer needs from one end of the supply chain to the other.
                    </Link>
                </span>
                <div>
                    <Link to={'/solutions'}>
                        <button type="button" className="ml-20 bg-my-green text-white border  hover:shadow-sm  mb-5 font-bold rounded-lg text-xl px-5 py-2 text-center mr-3 md:mr-0 ">
                            More Solutions
                        </button>
                    </Link>
                </div>
            </div>
            <div className='mb-20 md:mb-40'>
      {/* ... rest of your component code */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mx-20 ">
           
           {solutionsData.slice(0,3).map((solution, index) => (
               <Link to={'/solutions'}> 
              <div class="relative mx-auto w-full">
                  <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                      <div class="shadow p-4 rounded-lg bg-white" >
                          <div class="flex justify-center relative rounded-lg overflow-hidden h-40 md:h-64">
                              <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                  <div class="absolute inset-0 ">
                                      <img src={solution.solutions_image} alt='' />
                                  </div>
                              </div>

                          </div>

                          <div class="mt-4">
                              <h2 class="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                              {solution.solutions_title}
                              </h2>
                              <p class="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
                              {solution.solutions_description}
                              </p>
                          </div>
                      </div>
                  </a>
              </div>
              </Link>  
          ))}
            
       
          </div>
    </div>
        </div>
    );
}

export default Solutions;



