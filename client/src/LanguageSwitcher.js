
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
      <img
        src="https://cdn-icons-png.flaticon.com/128/3898/3898082.png"
        alt="Language"
        className="h-10 w-10 cursor-pointer"
      />

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

