
import './App.css';
import Login from './Component/Website/Users/Login';
import Registration from './Component/Website/Users/Registration';
import DriverRegistration from './Component/Driver/Users/Registration';
import DriverLogin from './Component/Driver/Users/Login';

import { BrowserRouter as Router , Routes , Route  ,Navigate} from 'react-router-dom';


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


import axios from 'axios';
import Cookies from 'js-cookie';
import { Suspense } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import NotFoundPage from './Component/Website/NotFoundPage';
import DriverHistoryPage from './Component/Driver/driverWebsite/DriverHistoryPage';
import { AuthProvider, useAuth } from './Component/Website/AuthContext';
import ChangePasswordForUser from './Component/Website/ChangePasswordForUser';
import ResetPassword from './Component/Website/ResetPassword';
// import { useCookies } from 'react-cookie';

// Set the Authorization header globally
axios.defaults.headers.common['Authorization'] = `${Cookies.get('token')}`;


function App() {
  

  return (
    <AuthProvider>

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
        <Route path='/changePassword' element={<ChangePasswordForUser/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/*' element={<NotFoundPage/>}/>
        
        

      {/* Driver routs  */}
      <Route path='/driverRegistration' element={<DriverRegistration/>}/>
      <Route path='/driverLogin' element={<DriverLogin/>}/>
      <Route path='/NewOrders' element={<NewOrders />} />
      <Route path='/orderDetailsDriver' element={<OrderDetailsDriver/>}/>
      <Route path='/orderDetailsDriver/:orderId' element={<OrderDetailsDriver/>}/>
      <Route path='/confirmedOrder' element={<ConfirmedOrder/>}/>
      <Route path='/confirmedOrder/:orderId' element={<ConfirmedOrder/>}/>
      <Route path='/driverOrders' element={<DriverHistoryPage/>}/>


     
      </Routes>

      <Footer/>
    
      </div>
      </Router>
      </Suspense>
      </AuthProvider>

  );
}

export default App;
