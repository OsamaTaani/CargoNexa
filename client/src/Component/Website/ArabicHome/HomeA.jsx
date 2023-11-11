import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/Home.css';
import HeroA from './HeroA';
import SolutionsA from './SolutionsA';
import ServicesA from './ServicesA';
import CarouselA from './CarouselA';




const HomeA = () => {

 
  return (
    <>

      <HeroA/>
      <SolutionsA/>
      <ServicesA/>
      <CarouselA/>
     
   </>
  );
};

export default HomeA;















// const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
// const [isNameDisplay, setIsNameDisplay] = useState(false);
// const [formData, setFormData] = useState({
//   "title": '',
//   "description": '',
//   "name": '',
// });
// const [data, setData] = useState([]);

// //   handel the Add Blog btn to open blog form 
// const blogFormOpen = () => {
//   setIsBlogFormOpen(!isBlogFormOpen);
// };
// const NameDisplay = () => {
//   setIsNameDisplay(!isNameDisplay);
// };

// useEffect(() => {
//   axios.get('http://localhost:3001/blogs')
//     .then((response) => {
//       setData(response.data.blogs);
//       console.log(response.data.blogs);
//       console.log(response.status)
//     })
//     .catch((error) => {
//       console.error('An error occurred:', error);
//     });
// }, []);


// const handleSubmit = async () => {
//   try {
//     console.log(formData)
//     const response = await axios.post('http://localhost:3001/addBlogs', formData);
//       alert("data added")

//       setFormData({
//         "title": '',
//         "description": '',
//         "name": '',
//       });
//       setIsBlogFormOpen(false);
     
      
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// };


//////////////////////return

   {/* Hero section */}
{/* <div className='grid grid-cols-2 ml-20 '>
  <div class="hero-content">
    <div class="hero-text mt-28 mb-5">
      <h1 class='font-bold text-[#191D88] md:text-5xl text-center slide-text  mb-5'>لوجستيات</h1>
      <h3 class='font-bold text-[#191D88] md:text-3xl text-center slide-text' >  موثوقة يمكنك الاعتماد عليها دائماً </h3>
    </div>
   
    <div class='grid justify-start border border-[#191D88] shadow-lg ml-28 mt-10 w-[20rem] p-3'>
      <div class='font-bold'>تتبع شحنتك</div>
      <div class="flex mb-3 mt-3 text-sm w-60" style={{ borderBottom: "solid gray 2px" }}>
        <img src={locationIcon} alt="locationIcon" className="h-5 border-b-5" />
        <form>
          <input className='w-60 focus:outline-none' placeholder='ادخل رقم التتبع الخاص بشحنتك' />
        </form>
      </div>
      <button onClick={blogFormOpen} className='bg-[#FFC436] w-10 text-black rounded-lg p-1'>
        تتبع
      </button>
    </div>
  </div>
  <div className='bg-center h-80 md:h-[20rem] p-10'>
    <img src={heroImage} alt='heroImage' id="hero-image" />
  </div>
</div> */}



















//الcard اللي بتفتح
 {/* <!-- translate --> */}
//  <div class="h-32 w-32 relative cursor-pointer mb-5">
//  <div class="absolute inset-0 bg-black opacity-25 rounded-lg shadow-2xl"></div>
//  <div class="absolute inset-0 transform hover:-translate-x-10 transition duration-300">
//    <div class="h-full w-full bg-orange-500 rounded-lg shadow-2xl"></div>
//  </div>
// </div>
