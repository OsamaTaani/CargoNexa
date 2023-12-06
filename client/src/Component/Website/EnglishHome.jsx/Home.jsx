import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/Home.css';
import Hero from './Hero';
import Solutions from './Solutions';
import Services from './Services';
import Carousel from './Carousel';

const Home = () => {

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  return (
    <>
      <Hero />
      <Solutions />
      <Carousel />
      <Services />
     
      {/* <div className='h-[50rem]'></div> */}
    </>
  );
};

export default Home;
