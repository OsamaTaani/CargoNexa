import React from 'react'
import heroImage from '../../Images/heroImage.jpg';
import { Link } from 'react-router-dom';


const Services = () => {
    return (
        <div className='mb-20 md:mb-40'>

            <div>

                <span className="group font-extrabold  text-xl  md:text-3xl xl:text-4xl flex justify-end">
                    <a href="/contact" className="text-right mr-20   block py-2 pl-3 pr-4 text-blue-900 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                    قطاعات الصناعة
                        <div className="w-32 md:w-52 h-1  bg-[#FFC436]  ">
                        </div> </a>
                </span>
                <br />
                <span className="group   text-sm  md:text-xl xl:text-xl ">
                    <a href="/contact" className="text-right mr-20 ml-20 md:ml-40 mb-5  block py-2 pl-3 pr-4 text-blue-900 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                    بغض النظر عن صناعتك، وسلعتك، أو أسواقك الرئيسية، تقدم ميرسك حلاول لوجستية عالمية ومحلية تمكن الأعمال الصغيرة والكبيرة من النمو           </a>
                </span>
                <Link to={'/services'}> <button type="button" class="ml-2 text-[#191D88] border border-blue-800 hover:shadow-sm hover:shadow-[#FFC436] mb-5 font-bold rounded-lg text-xl px-5 py-3 text-center mr-3 md:mr-0 ">More Solutions </button> </Link> 

            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mx-20 ">
                <div class="relative mx-auto w-full">
                    <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                    <div class="shadow p-4 rounded-lg bg-white" >
                            <div class="flex justify-center relative rounded-lg overflow-hidden h-40 md:h-64">
                                <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div class="absolute inset-0 ">
                                        <img src={heroImage} alt='' />
                                    </div>
                                </div>

                            </div>

                            <div class="mt-4">
                                <h2 class="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                    Statue of Liberty
                                </h2>
                                <p class="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
                                    New York, NY 10004, United States
                                </p>
                            </div>




                        </div>
                    </a>
                </div>

                <div class="relative mx-auto w-full">
                    <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div class="shadow p-4 rounded-lg bg-white">
                            <div class="flex justify-center relative rounded-lg overflow-hidden  h-40 md:h-64">
                                <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div class="absolute inset-0 ">
                                        <img src={heroImage} alt='' />
                                    </div>
                                </div>

                            </div>

                            <div class="mt-4">
                                <h2 class="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                    Statue of Liberty
                                </h2>
                                <p class="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
                                    New York, NY 10004, United States
                                </p>
                            </div>

                        </div>
                    </a>
                </div>

                <div class="relative mx-auto w-full">
                    <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div class="shadow p-4 rounded-lg bg-white">
                            <div class="flex justify-center relative rounded-lg overflow-hidden  h-40 md:h-64">
                                <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div class="absolute inset-0  ">
                                        <img src={heroImage} alt='' />
                                    </div>
                                </div>

                            </div>

                            <div class="mt-4">
                                <h2 class="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                    Statue of Liberty
                                </h2>
                                <p class="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
                                    New York, NY 10004, United States
                                </p>
                            </div>


                        </div>
                    </a>
                </div>


            </div>
        </div>
    )
}

export default Services

















