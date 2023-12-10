import React, { useState, useEffect } from 'react';
import img1 from '../../Images/box1.jpeg';
import img2 from '../../Images/box2.webp';
import img3 from '../../Images/box3.jpeg';
import img4 from '../../Images/truck2.jpeg';
import { Link } from 'react-router-dom';


const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(1);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
            setCurrentSlide(nextSlide);
        }, 4000);

        return () => {
            clearInterval(slideInterval);
        };
    }, [currentSlide]);

    return (
        <div>
            <div className="carousel w-[90%] mx-auto mb-20 ">
                {Array.from({ length: 4 }, (_, i) => (
                    <div
                        key={i + 1}
                        id={`slide${i + 1}`}
                        className={`carousel-item relative w-full ${currentSlide === i + 1 ? 'visible' : 'hidden'
                            }`}
                    >

                        <img
                            src={i === 0 ? img1 : i === 1 ? img2 : i === 2 ? img3 : img4}
                            className="w-full h-[15rem] object-cover md:h-[35rem]  "
                        />


                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
                            <a
                                // href={`#slide${i === 0 ? 4 : i}`}
                                className="btn btn-circle text-white sm:text-2xl  md:text-3xl  lg:text-4xl mt-10 cursor-pointer"
                                onClick={() => setCurrentSlide(i === 0 ? 4 : i)}
                            >

                                ❮
                            </a>
                            <div className='flex  flex-wrap  justify-center'>
                                <div className='text-white  sm:text-1xl  md:text-3xl  lg:text-4xl  text-center font-bold  mt-10 mb-2 md:mx-20' >We make shipping big stuff cheap and easy by helping customers directly connect with providers  who have extra truck space.</div>

                                <div>
                                 <Link to={'/services '}>  <button type="button" class="ml-2 text-white bg-my-green hover:bg-[#54beb3] font-bold rounded-lg md:text-xl md:px-5 md:py-3 px-2 py-1  text-center mr-3 md:mr-0 ">Quote Now </button></Link> 
                                </div>
                            </div>
                            <a
                                // href={`#slide${i === 3 ? 1 : i + 2}`}
                                className="btn btn-circle text-white sm:text-xl  md:text-3xl  lg:text-4xl  mt-10 cursor-pointer"
                                onClick={() => setCurrentSlide(i === 3 ? 1 : i + 2)}
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
