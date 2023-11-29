// Solutions.js
import React, { useEffect, useState } from 'react';
import img1 from '../Images/box1.jpeg';
import manHoldBox from '../Images/manHoldBox.webp';
import truck from '../Images/truck.jpeg';
import map from '../Images/map.jpg';
import axios from 'axios';

const SolutionsPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      const [data, setData] = useState([]);

      useEffect(() => {
        axios.get('http://localhost:3001/solutions') // Replace with your API endpoint
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
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
   <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 ">
      {data.map((item) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-10 ">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{item.solutions_title}</h2>
            <p className="mt-4 text-gray-600 text-lg">{item.solutions_description}</p>
            <div className="mt-8">{/* Additional content here */}</div>
          </div>
          <div className="mt-12 md:mt-0">
            <img src={item.solutions_image} alt={item.solutions_title} className="object-cover rounded-lg shadow-md" />
          </div>
        </div>
      ))}
    </div>
    {/* END CARDS SECTION */}
</>
  );
};

export default SolutionsPage;




