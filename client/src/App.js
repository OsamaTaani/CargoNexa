
import './App.css';
import Login from './Component/Users/Login';
import Registration from './Component/Users/Registration';
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


function App() {
  return (
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
        <Route path='/payment' element={<Payment/>}/>
      

      {/* Driver routs  */}
      <Route path='/driverRegistration' element={<DriverRegistration/>}/>
      <Route path='/driverLogin' element={<DriverLogin/>}/>
      <Route path='/NewOrders' element={<NewOrders/>}/>


      {/* Admin routs  */}
      <Route path='/adminRegistration' element={<DriverRegistration/>}/>
      <Route path='/adminLogin' element={<DriverLogin/>}/>
      </Routes>

      <Footer/>
      </div>
      </Router>
  );
}

export default App;
