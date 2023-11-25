import React, { useEffect, useState } from 'react'
import logo4 from '../../Image/logo4-transformed.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditPopupUserData from './EditPopupUserData';
import EditPopupDriverData from './EditPopupDriverData';
const Dashboard = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const [data, setData] = useState([]);
      const [selectedTab, setSelectedTab] = useState('dashboard');
      // add useState clicked to change the bg to white when the btn clicked 
      const [clicked, setClicked] = useState(false);

      const [editUser, setEditUser] = useState(null);
      const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

      const [editDriver, setEditDriver] = useState(null);
      const [isEditDriverPopupOpen, setIsEditDriverPopupOpen] = useState(false);

    
      useEffect(() => {
        // Fetch initial data when the component mounts
        fetchData();
      }, [selectedTab]);
    
      const fetchData = async () => {
        try {
          let response;
          // Make the appropriate API call based on the selected tab
          switch (selectedTab) {
            case 'dashboard':
              response = await axios.get('http://localhost:3001/order');
              break;
            case 'profile':
              response = await axios.get('http://localhost:3001/register');
              break;
            case 'users':
              response = await axios.get('http://localhost:3001/register');
              break;
            case 'drivers':
              response = await axios.get('http://localhost:3001/driver');
              break;
            default:
              break;
          }
    
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setClicked(true);

      };
    
      const handleSignOut = () => {
        // Implement sign-out logic, e.g., delete token
        console.log('Signing out...');
      };

  // State to store the fetched data
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust as needed
  

  // Effect to fetch data using Axios when the component mounts
  useEffect(() => {
  
    // Fetch data using Axios
    axios.get('http://localhost:3001/order')
      .then(response => {
        // Set the fetched data to the state
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts


 const handlePrevClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };


  //edit handle for users data**********************************************************************************************
  const handleEditClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/register/${userId}`); // Replace with your API endpoint
      setEditUser(response.data);
      setIsEditPopupOpen(true);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const handleEditSubmit = async (editedUserData) => {
    try {
      // Make a PUT request to update the order data
      await axios.put(`http://localhost:3001/register/${editUser.id}`, editedUserData); // Replace with your API endpoint
      // Close the edit popup and fetch the updated data
      setIsEditPopupOpen(false);
      fetchData(); // Implement a function to fetch data from your API
    } catch (error) {
      console.error('Error updating order data:', error);
    }
  };

  //edit handle for driver data **********************************************************************************************
  const handleDriverEditClick = async (driverId) => {
    try {
      const response = await axios.get(`http://localhost:3001/driver/${driverId}`); // Replace with your API endpoint
      setEditDriver(response.data);
      setIsEditDriverPopupOpen(true);
    } catch (error) {
      console.error('Error fetching driver data:', error);
    }
  };

  const handleDriverEditSubmit = async (editedDriverData) => {
    try {
      // Make a PUT request to update the driver data
      await axios.put(`http://localhost:3001/driver/${editDriver.id}`, editedDriverData); // Replace with your API endpoint
      // Close the edit popup and fetch the updated data
      setIsEditDriverPopupOpen(false);
      fetchData(); // Implement a function to fetch data from your API
    } catch (error) {
      console.error('Error updating driver data:', error);
    }
  };
  
  //handle soft delete **********************************************************************************************
  const handleSoftDeleteUser = async (userId) => {
    try {
      // Send a PATCH request to update the status for soft delete
      await axios.patch(`http://localhost:3001/register/${userId}`, { isDeleted: 'true' });
  
      // Refresh the data or handle the removal of the soft-deleted user from your local state
      fetchData();
      setIsEditPopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error('Error soft deleting user:', error);
    }
  };
  
  // Soft delete function for driver data
  const handleSoftDeleteDriver = async (driverId) => {
    try {
      // Send a PATCH request to update the status for soft delete
      await axios.patch(`http://localhost:3001/driver/${driverId}`, { isDeleted: 'true' });
  
      // Refresh the data or handle the removal of the soft-deleted driver from your local state
      fetchData();
      setIsEditDriverPopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error('Error soft deleting driver:', error);
    }
  };
  
  return (
    <>
    {/* component */}
    <div className="min-h-screen bg-gray-50/50">
    <aside className="bg-gradient-to-br bg-my-green -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div className="relative border-b border-white/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <h3 className="block antialiased tracking-normal font-sans text-3xl text-center font-semibold leading-relaxed text-white">
             CargoNexa
            </h3>
          </a>
          <button
            className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
          <li>
              <a aria-current="page" className="active" href="#">
                <button
                  className={`middle none font-sans font-bold center transition-all disabled:opacity-50  hover:bg-white disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr text-black shadow-md active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize ${
                    selectedTab === 'dashboard' ? 'bg-white' : ''
                    }  ${selectedTab !== 'dashboard'  ? 'bg-my-green' : ''}`}
                  type="button"
                  onClick={() => handleTabClick('dashboard')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    dashboard
                  </p>
                </button>
              </a>
            </li>

            <li>
              <a className="" href="#">
              <button
                    className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr hover:bg-white text-black shadow-md active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize ${
                      selectedTab === 'profile' ? 'bg-white' : ''
                    }  ${selectedTab !== 'profile'  ? 'bg-my-green' : ''}`}
                    type="button"
                    onClick={() => handleTabClick('profile')}
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    profile
                  </p>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
              <button
                  className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr hover:bg-white text-black shadow-md active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize ${
                    selectedTab === 'users' ? 'bg-white' : ''
                  }  ${selectedTab !== 'users'  ? 'bg-my-green' : ''}`}
                  type="button"
                  onClick={() => handleTabClick('users')}
                >
                  <svg class="w-5 h-5"
xmlns="http://www.w3.org/2000/svg" width="24"  height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
</svg>

                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Users
                  </p>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
              <button
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr hover:bg-white text-black shadow-md  active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize ${
                  selectedTab === 'drivers' ? 'bg-white' : ''
                    }  ${selectedTab !== 'drivers'  ? 'bg-my-green' : ''}`}
                type="button"
                onClick={() => handleTabClick('drivers')}
              >
                 <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/> <circle cx="7" cy="17" r="2" /> <circle cx="17" cy="17" r="2" /> <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /></svg>

                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Drivers
                  </p>
                </button>
              </a>
            </li>
          </ul>
          <ul className="mb-4 flex flex-col gap-1">
            <li className="mx-3.5 mt-4 mb-2">
              <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                {/* auth pages */}
              </p>
            </li>
            <li>
             
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-black hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p onClick={handleSignOut}  className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    sign out
                  </p>
                </button>
            
            </li>
            <li>
              <a className="" href="#">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-black hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                 
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  </p>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 xl:ml-80">
        <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
              <nav aria-label="breadcrumb" className="w-max">
                <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                  <li className="flex items-center text-black antialiased font-sans text-lg font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                   
                      <p className="block antialiased font-sans text-2xl leading-normal text-black font-bold  transition-all hover:text-blue-500 hover:opacity-100">
                        dashboard
                      </p>
                  </li>

                </ol>
              </nav>
             
            </div>
            <div className="flex items-center">
              <div className="mr-auto md:mr-4 md:w-56">
                <div className="relative w-full min-w-[200px] h-10">
                 
                </div>
              </div>
      
            </div>
          </div>
        </nav>
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative flex flex-col bg-clip-border h-24 rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#219C90] to-[#54beb3] text-white  shadow-md absolute -mt-4 grid h-12 w-32 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-black"
                >
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clipRule="evenodd"
                  />
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Money
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  $53k
                </h4>
              </div>
            
            </div>
            <div className="relative flex flex-col bg-clip-border h-24 rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#219C90] to-[#54beb3] text-white  shadow-md absolute -mt-4 grid h-12 w-32 place-items-center">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Users
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  2,300
                </h4>
              </div>
             
            </div>
            <div className="relative flex flex-col bg-clip-border h-24 rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#219C90] to-[#54beb3] text-white  shadow-md absolute -mt-4 grid h-12 w-32 place-items-center">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-black"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Today's Drivers
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
20
                </h4>
              </div>
           
            </div>
            <div className="relative flex flex-col bg-clip-border h-24 rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#219C90] to-[#54beb3] text-white  shadow-md absolute -mt-4 grid h-12 w-32 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-black"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Orders
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  $103,430
                </h4>
              </div>
             
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-6 ">
          
            <div className="bg-white p-8 rounded-md w-full">
    <div className=" flex  items-center justify-between pb-6">
    <div className="flex">
  <div>
    <h2 className="text-gray-600 font-bold mr-10 md:mr-40">Orders</h2>
  </div>
  
</div>

      
    
    </div>
    <div>
     

      {/* Conditional rendering based on selected tab */}
      {selectedTab === 'dashboard' && (
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                shipping Location
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                receiving Location
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                shipping Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
                </th>
               
              </tr>
            </thead>
            <tbody>
            {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(order => (
              <tr key={order.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                  <Link to={`/OrderDetails/${order.id}`}>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                       {order.order_title}
                      </p>
                    </div>
                     </Link> 
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">  {order. shipping_location}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                
                  {order.receiving_location}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.shipping_date}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className={`relative inline-block px-5 py-2 font-semibold leading-tight  text-white
                ${order.status === 'pending' ? 'bg-gray-500' : ''}
                ${order.status === 'shipped' ? 'bg-yellow-500' : ''}
                ${order.status === 'on the way' ? 'bg-orange-500' : ''}
                ${order.status === 'delivered' ? 'bg-green-500' : ''}
              rounded-full
              `}>
              
                <span className="relative">{order.status}</span>
              </span>
            </td>
          
              </tr>
               ))}
        
            </tbody>
          </table>
           </div>
          <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
            <div className="inline-flex mt-2 xs:mt-0">
              <button  onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={`text-sm text-white transition duration-150 ${
              currentPage === 1 ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
            } font-semibold py-2 px-4 rounded-l`}>
                Prev
              </button>
              &nbsp; &nbsp;
              <button
            onClick={handleNextClick}
            disabled={orders.length < itemsPerPage}
            className={`text-sm text-white transition duration-150 ${
              orders.length < itemsPerPage ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
            } font-semibold py-2 px-4 rounded-r`}
          >
                Next
              </button>
            </div>
          </div>
       
      </div>
       
        </div>
      )}
    

      {selectedTab === 'profile' && (
           <div>
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
         <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
           <table className="min-w-full leading-normal">
             <thead>
               <tr>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   User Name
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 User Phone Number
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 User Email
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 User Password
                 </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
               </tr>
             </thead>
             <tbody>
             {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(userData => (
              userData.isDeleted !== 'true' && (
               <tr key={userData.id}>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <div className="flex items-center">
                   <Link to={`/OrderDetails/${userData.user_username}`}>
  
                     <div className="ml-3">
                       <p className="text-gray-900 whitespace-no-wrap">
                        {userData.user_username}
                       </p>
                     </div>
                      </Link> 
                   </div>
                 </td>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <p className="text-gray-900 whitespace-no-wrap">  {userData.user_phone_number}</p>
                 </td>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <p className="text-gray-900 whitespace-no-wrap">
                 
                   {userData.user_email}
                   </p>
                 </td>
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   <p className="text-gray-900 whitespace-no-wrap">{userData.user_password}</p>
                 </td>
                
                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex space-x-2">
        
       <button onClick={() => handleEditClick(userData.id)}>
          <svg class="text-teal-600 w-5 h-5 "
        xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            {/* ... SVG path for edit */}
            </button>

            <button onClick={() => handleSoftDeleteUser(userData.id)} >
          <svg class="text-orange-600 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          </button>

            {/* ... SVG path for delete */}
         
        </div>
      </td>
               </tr>
              )  ))}
         
             </tbody>
           </table>
            </div>
           <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
             <div className="inline-flex mt-2 xs:mt-0">
               <button  onClick={handlePrevClick}
             disabled={currentPage === 1}
             className={`text-sm text-white transition duration-150 ${
               currentPage === 1 ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
             } font-semibold py-2 px-4 rounded-l`}>
                 Prev
               </button>
               &nbsp; &nbsp;
               <button
             onClick={handleNextClick}
             disabled={data.length < itemsPerPage}
             className={`text-sm text-white transition duration-150 ${
               data.length < itemsPerPage ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
             } font-semibold py-2 px-4 rounded-r`}
           >
                 Next
               </button>
             </div>
           </div>
        
       </div>
        
         </div>
            )}
            {isEditPopupOpen && (
  <EditPopupUserData
    user={editUser}
    isOpen={isEditPopupOpen}
    onClose={() => setIsEditPopupOpen(false)}
    onSubmit={handleEditSubmit}
  />
)}

      {selectedTab === 'users' && (
         <div>
         <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
       <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
         <table className="min-w-full leading-normal">
           <thead>
             <tr>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 User Name
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               User Phone Number
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               User Email
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               User Password
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
             </tr>
           </thead>
           <tbody>
           {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(userData => (
            userData.isDeleted !== 'true' && (
             <tr key={userData.id}>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <div className="flex items-center">
                 <Link to={`/OrderDetails/${userData.user_username}`}>

                   <div className="ml-3">
                     <p className="text-gray-900 whitespace-no-wrap">
                      {userData.user_username}
                     </p>
                   </div>
                    </Link> 
                 </div>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">  {userData.user_phone_number}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">
               
                 {userData.user_email}
                 </p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{userData.user_password}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex space-x-2">
        
       <button onClick={() => handleEditClick(userData.id)}>
          <svg class="text-teal-600 w-5 h-5 "
        xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            {/* ... SVG path for edit */}
            </button>

            <button onClick={() => handleSoftDeleteUser(userData.id)}>
          <svg class="text-orange-600 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          </button>

            {/* ... SVG path for delete */}
         
        </div>
      </td>

             </tr>
            )  ))}
       
           </tbody>
         </table>
          </div>
         <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
           <div className="inline-flex mt-2 xs:mt-0">
             <button  onClick={handlePrevClick}
           disabled={currentPage === 1}
           className={`text-sm text-white transition duration-150 ${
             currentPage === 1 ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
           } font-semibold py-2 px-4 rounded-l`}>
               Prev
             </button>
             &nbsp; &nbsp;
             <button
           onClick={handleNextClick}
           disabled={data.length < itemsPerPage}
           className={`text-sm text-white transition duration-150 ${
             data.length < itemsPerPage ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
           } font-semibold py-2 px-4 rounded-r`}
         >
               Next
             </button>
           </div>
         </div>
      
     </div>
      
       </div>
      )}
           {/* {isEditPopupOpen && (
  <EditPopupUserData
    user={editUser}
    isOpen={isEditPopupOpen}
    onClose={() => setIsEditPopupOpen(false)}
    onSubmit={handleEditSubmit}
  />
)} */}
      {selectedTab === 'drivers' && (
         <div>
         <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
       <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
         <table className="min-w-full leading-normal">
           <thead>
             <tr>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               driver_username
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               driver_email
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               driver_license
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               truck_size
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               plate_number
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               production_year
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               truck_type
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               driver_password
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               status
               </th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
             </tr>
           </thead>
           <tbody>
           {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(driverData => (
            driverData.isDeleted !== 'true' && (
             <tr key={driverData.id}>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <div className="flex items-center">
                 <Link to={`/OrderDetails/${driverData.driver_username}`}>
                   <div className="ml-3">
                     <p className="text-gray-900 whitespace-no-wrap">
                      {driverData.driver_username}
                     </p>
                   </div>
                    </Link> 
                 </div>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">  {driverData. driver_email}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">
               
                 {driverData.driver_license}
                 </p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{driverData.truck_size}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{driverData.plate_number}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{driverData.production_year}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{driverData.truck_type}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{driverData.driver_password}</p>
               </td>
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <p className="text-gray-900 whitespace-no-wrap">{driverData.status}</p>
               </td>
             
               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex space-x-2">
        
       <button onClick={() => handleDriverEditClick(driverData.id)}>
          <svg class="text-teal-600 w-5 h-5 "
        xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            {/* ... SVG path for edit */}
            </button>

            <button  onClick={() => handleSoftDeleteDriver(driverData.id)}>
          <svg class="text-orange-600 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          </button>

            {/* ... SVG path for delete */}
         
        </div>
      </td>
             </tr>
              )))}
       
           </tbody>
         </table>
          </div>
         <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
           <div className="inline-flex mt-2 xs:mt-0">
             <button  onClick={handlePrevClick}
           disabled={currentPage === 1}
           className={`text-sm text-white transition duration-150 ${
             currentPage === 1 ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
           } font-semibold py-2 px-4 rounded-l`}>
               Prev
             </button>
             &nbsp; &nbsp;
             <button
           onClick={handleNextClick}
           disabled={orders.length < itemsPerPage}
           className={`text-sm text-white transition duration-150 ${
             orders.length < itemsPerPage ? 'bg-gray-300' : 'hover:bg-[#51aaa1] bg-my-green'
           } font-semibold py-2 px-4 rounded-r`}
         >
               Next
             </button>
           </div>
         </div>
      
     </div>
      
       </div>
      )}
           {isEditDriverPopupOpen && (
  <EditPopupDriverData
    driver={editDriver}
    isOpen={isEditDriverPopupOpen}
    onClose={() => setIsEditDriverPopupOpen(false)}
    onSubmit={handleDriverEditSubmit}
  />
)}
      {selectedTab === 'signout' && (
        <div>
          Render sign-out logic
        </div>
      )}
    </div>
  </div>

          </div>
        </div>
        <div className="text-blue-gray-600">
          <footer className="py-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
                © 2023, made with{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="-mt-0.5 inline-block h-3.5 w-3.5"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>{" "}
                by{" "}
                <a
                  href="https://www.creative-tim.com"
                  target="_blank"
                  className="transition-colors hover:text-blue-500"
                >
                 Malath Yasin
                </a>{" "}
                
              </p>
             
            </div>
          </footer>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default Dashboard