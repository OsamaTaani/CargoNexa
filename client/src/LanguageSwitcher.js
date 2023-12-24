
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
     <svg class="text-teal-600 w-10 h-10"
xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
 <path stroke="none" d="M0 0h24v24H0z"/> 
  <circle cx="12" cy="12" r="9" />  
  <line x1="3.6" y1="9" x2="20.4" y2="9" /> 
   <line x1="3.6" y1="15" x2="20.4" y2="15" /> 
    <path d="M11.5 3a17 17 0 0 0 0 18" /> 
     <path d="M12.5 3a17 17 0 0 1 0 18" /></svg>

      {isHovered && (
        <div className="absolute top-10 right-0  bg-my-green rounded-xl py-2 px-4 text-white shadow-lg  p-2 z-10">
          <button onClick={() => changeLanguage('en')} className='border-b border-gray-300'>English</button>
          <button onClick={() => changeLanguage('ar')}>العربية</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;



// import React from 'react';
// import { useTranslation } from 'react-i18next';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div>
      
//       <img src='https://cdn-icons-png.flaticon.com/128/4570/4570429.png' onClick={() => changeLanguage('ar')} className='h-10 w-10'/> 
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('ar')}>العربية</button>
//     </div>

    
//   );
// };

// export default LanguageSwitcher;







// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();
//   const [showDropdown, setShowDropdown] = useState(false);

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     setShowDropdown(false); // Close the dropdown after selecting a language
//   };

//   return (
//     <div className="relative inline-block">
//       <img
//         src="https://cdn-icons-png.flaticon.com/128/4570/4570429.png"
//         alt="Language"
//         onClick={() => setShowDropdown(!showDropdown)}
//         className="h-10 w-10 cursor-pointer"
//       />

//       {showDropdown && (
//         <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-md shadow-md p-2 z-10">
//           <button onClick={() => changeLanguage('en')}>English</button>
//           <button onClick={() => changeLanguage('ar')}>العربية</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LanguageSwitcher;

