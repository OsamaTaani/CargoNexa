import React, { useEffect, useState } from 'react';
import '../CSS/services.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateOrder from './CreateOrder';
const ServicesPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [servicesData, setServicesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/services'); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        setServicesData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once after the component mounts
  
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
<div className="mx-auto mt-10 max-w-screen-xl py-20">
  <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">OUR SERVICES</h2>
 <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
    {servicesData.map((service ) => (
     <article  key={service.id}
          className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
        {/* Render your card content based on the structure of your database data */}
       

 
<Link to={'/CreateOrder'}>
{/* <CreateOrder service={service.services_title}/> */}
          <img
            src={service.services_image}
            className="h-56 w-full object-cover"
            alt="Service image"
          />
       <div className="flex-auto px-6 py-5 text-center">
  {/* Render other card details dynamically */}
  <h3 className="block mt-4 mb-3 text-xl font-semibold xl:text-2xl mx-auto">
    {service.services_title}
  </h3>
  <span className="block mb-2 text-sm font-semibold mx-auto">
    {/* Render category dynamically */}
    {service.services_description}
  </span>
  
  {/* <button className="flex items-center mx-auto inline-block cursor-pointer select-none rounded-full border bg-my-green px-5 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
    Order
  </button> */}
</div>



</Link> 
      </article>
    ))}
  </div>
</div>


</>


  );
};

export default ServicesPage;
