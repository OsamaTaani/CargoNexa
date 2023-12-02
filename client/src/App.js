
import './App.css';
import Login from './Component/Website/Users/Login';
import Registration from './Component/Website/Users/Registration';
import DriverRegistration from './Component/Driver/Users/Registration';
import DriverLogin from './Component/Driver/Users/Login';

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';


import Contact from './Component/Website/Contact';

import Home from './Component/Website/EnglishHome.jsx/Home';
import Header from './Component/Website/EnglishHome.jsx/Header';
import Footer from './Component/Website/EnglishHome.jsx/Footer';
import SolutionsPage from './Component/Website/SolutionsPage';
import FAQ from './Component/Website/FAQ';
import About from './Component/Website/About';
import Payment from './Component/Website/Payment';
import ServicesPage from './Component/Website/ServicesPage';
import StartPage from './Component/Website/StartPage';
import NewOrders from './Component/Driver/driverWebsite/NewOrders';
import OrderDetailsPage from './Component/Website/OrderDetailsPage';
import CreateOrder from './Component/Website/CreateOrder';
import Orders from './Component/Website/Orders';
import OrderDetails from './Component/Driver/driverWebsite/OrderDetailsDriver';
import OrderDetailsDriver from './Component/Driver/driverWebsite/OrderDetailsDriver';
import ConfirmedOrder from './Component/Driver/driverWebsite/ConfirmedOrder';
import ProfilePage from './Component/Website/UserProfile';
import UserProfile from './Component/Website/UserProfile';
import Dashboard from './Component/Admin/Dashboard';
import Dashboard2 from './Component/Admin/Dashboard2';

import axios from 'axios';
import Cookies from 'js-cookie';
import { Suspense } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
// import { useCookies } from 'react-cookie';

// Set the Authorization header globally
axios.defaults.headers.common['Authorization'] = `${Cookies.get('token')}`;


function App() {
  return (
    <Suspense fallback="loading">
    <Router>
    <div className="App">
    
    
      <Header/>
     
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/solutions' element={<SolutionsPage/>}/>
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/start' element={<StartPage/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/faq' element={<FAQ/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/createOrder' element={<CreateOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/orderDetails' element={<OrderDetailsPage/>}/>
        <Route path="/orderDetails/:orderId" element={<OrderDetailsPage/>} />
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
      

      {/* Driver routs  */}
      <Route path='/driverRegistration' element={<DriverRegistration/>}/>
      <Route path='/driverLogin' element={<DriverLogin/>}/>
      <Route path='/NewOrders' element={<NewOrders/>}/>
      <Route path='/orderDetailsDriver' element={<OrderDetailsDriver/>}/>
      <Route path='/orderDetailsDriver/:orderId' element={<OrderDetailsDriver/>}/>
      <Route path='/confirmedOrder' element={<ConfirmedOrder/>}/>
      <Route path='/confirmedOrder/:orderId' element={<ConfirmedOrder/>}/>


     
      </Routes>

      <Footer/>
       {/* Admin routs  */}
       {/* <Routes>
       <Route path='/adminRegistration' element={<DriverRegistration/>}/>
      <Route path='/adminLogin' element={<DriverLogin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard2' element={<Dashboard2/>}/>
      </Routes> */}
      </div>
      </Router>
      </Suspense>
  );
}

export default App;
