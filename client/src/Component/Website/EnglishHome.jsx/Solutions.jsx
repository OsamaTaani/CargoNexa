import React from 'react'
import heroImage from '../../Images/heroImage.jpg';
import manHoldBox from '../../Images/manHoldBox.webp';
import truck from '../../Images/truck.jpeg';
import map from '../../Images/map.jpg';
import { Link } from 'react-router-dom';


const Solutions = () => {
    return (
        <div className='mb-20 md:mb-40'>

            <div>

                <span className="group font-extrabold  text-xl  md:text-3xl xl:text-4xl flex justify-end">
                    <a href="/contact" className="text-right mr-20   block py-2 pl-3 pr-4 text-blue-900 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                        الحلول اللوجستية

                        <div className="w-32 md:w-52 h-1  bg-[#FFC436]  ">
                        </div> </a>
                </span>
                <br />
                <span className="group   text-sm  md:text-xl xl:text-xl ">
                    <a href="/contact" className="text-right mr-20 ml-20 md:ml-40 mb-5  block py-2 pl-3 pr-4 text-blue-900 rounded md:bg-transparent md:p-0 relative" aria-current="page">
                        من المزرعة إلى ثلاجتك، أو من المستودع إلى خزانة ملابسك، تعمل شركة CargoNexa على تطوير
                        حلول تلبي احتياجات العملاء من أحد طرفي سلسلة التوريد إلى الطرف الآخر                     </a>
                </span>
                <div>
                 <Link to={'/solutions'}> <button type="button" class="ml-2 text-[#191D88] border border-blue-800 hover:shadow-sm hover:shadow-[#FFC436] mb-5 font-bold rounded-lg text-xl px-5 py-3 text-center mr-3 md:mr-0 ">More Solutions </button> </Link> 
                 </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mx-20">
                <div class="relative mx-auto w-full  ">
                    <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div class=" shadow hover:shadow-[#FFC436]  p-4 rounded-lg bg-white">
                            <div class="flex justify-center relative rounded-lg overflow-hidden h-40 md:h-72">
                                <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div class="absolute inset-0 ">
                                        <img src={manHoldBox} alt='' />
                                    </div>
                                </div>

                            </div>

                            <div class="mt-4 text-right  text-blue-900">
                                <h2 class="font-medium text-base md:text-lg  line-clamp-1" title="New York">
                                توزيع اللحظة الأخيرة                                                          </h2>
                                <p class="mt-2 text-sm  line-clamp-1" title="New York, NY 10004, United States">
                                خدمات التوزيع السريع لضمان التسليم في اللحظة الأخيرة                                </p>
                            </div>




                        </div>
                    </a>
                </div>

                <div class="relative mx-auto w-full">
                    <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div class="shadow hover:shadow-[#FFC436] 	 p-4 rounded-lg bg-white">
                            <div class="flex justify-center relative rounded-lg overflow-hidden  h-40 md:h-72">
                                <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div class="absolute inset-0 ">
                                        <img src={truck} alt='' />
                                    </div>
                                </div>

                            </div>

                            <div class="mt-4 text-right  text-blue-900">
                                <h2 class="font-medium text-base md:text-lg line-clamp-1" title="New York">
                                النقل البري                                </h2>
                                <p class="mt-2 text-sm line-clamp-1" title="New York, NY 10004, United States">
                                تقديم خدمات النقل البري لنقل البضائع بين المدن والمناطق المختلفة داخل البلاد                                </p>
                            </div>

                        </div>
                    </a>
                </div>

                <div class="relative mx-auto w-full">
                    <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <div class="shadow hover:shadow-[#FFC436] 	 p-4 rounded-lg bg-white">
                            <div class="flex justify-center relative rounded-lg overflow-hidden  h-40 md:h-72">
                                <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                    <div class="absolute inset-0  ">
                                        <img src={map} alt='' />
                                    </div>
                                </div>

                            </div>

                            <div class="mt-4 text-right  text-blue-900">
                                <h2 class="font-medium text-base md:text-lg  line-clamp-1" title="New York">
                                تقنية وتتبع                                </h2>
                                <p class="mt-2 text-sm  line-clamp-1" title="New York, NY 10004, United States">
                                تقديم تكنولوجيا تتبع متقدمة تسمح بمتابعة البضائع في الوقت الحقيقي                                </p>
                            </div>


                        </div>
                    </a>
                </div>


            </div>
        </div>
    )
}

export default Solutions

















