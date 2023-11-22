import React from 'react';
import heroImage from '../../Images/heroImage.jpg';
import manHoldBox from '../../Images/manHoldBox.webp';
import truck from '../../Images/truck.jpeg';
import map from '../../Images/map.jpg';
import { Link } from 'react-router-dom';

const Solutions = () => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mx-20">
                <div className="relative mx-auto w-full">
                    <a href="#" className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div className="shadow-md hover:shadow-my-green p-4 rounded-lg bg-white">
                            <div className="flex justify-center relative rounded-lg overflow-hidden h-40 md:h-72">
                                <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div className="absolute inset-0 ">
                                        <img src={manHoldBox} alt='' />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4  text-black">
                                <h2 className="font-medium text-base md:text-lg line-clamp-1" title="New York">
                                    Last-Mile Delivery
                                </h2>
                                <p className="mt-2 text-sm line-clamp-1" title="New York, NY 10004, United States">
                                    Fast distribution services to ensure last-minute delivery.
                                </p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="relative mx-auto w-full">
                    <a href="#" className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div className="shadow-md hover:shadow-my-green p-4 rounded-lg bg-white">
                            <div className="flex justify-center relative rounded-lg overflow-hidden h-40 md:h-72">
                                <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div className="absolute inset-0 ">
                                        <img src={truck} alt='' />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4  text-black">
                                <h2 className="font-medium text-base md:text-lg line-clamp-1" title="New York">
                                    Land Transportation
                                </h2>
                                <p className="mt-2 text-sm line-clamp-1" title="New York, NY 10004, United States">
                                    Providing land transportation services for goods movement between cities and regions within the country.
                                </p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="relative mx-auto w-full">
                    <a href="#" className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div className="shadow-md hover:shadow-my-green p-4 rounded-lg bg-white">
                            <div className="flex justify-center relative rounded-lg overflow-hidden h-40 md:h-72">
                                <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div className="absolute inset-0 ">
                                        <img src={map} alt='' />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4  text-black">
                                <h2 className="font-medium text-base md:text-lg line-clamp-1" title="New York">
                                    Technology and Tracking
                                </h2>
                                <p className="mt-2 text-sm line-clamp-1" title="New York, NY 10004, United States">
                                    Providing advanced tracking technology allowing real-time monitoring of goods.
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Solutions;
