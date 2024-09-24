import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Screens/Sigunp/Signup';
import Login from './Screens/Login/Login';
import Home from './Screens/Home/Home';
import AuthRoute from './Routing/AuthRoute';
import ProtectedRoute from './Routing/ProtectedRoute';
import RoomList from './Screens/Room/RoomList';
import Booking from './Screens/Booking/Booking';
import PMethod from './Screens/Payment/PMethod';
import Services from './Screens/Services/Services';
import Inventory from './Screens/Inventory/Inventory';
import ServicesReq from './Screens/Services/ServicesReq';
import Feedback from './Screens/Feedback/Feedback';
import Registration from './Screens/reg/Registration';
import Manager from './Screens/Manager/Manager';
import Staff from './Screens/Staff/Staff';
import Admin from './Screens/Admin/Admin';
import CustomerDetails from './Screens/Customer/CustomerDetails';
import RoomDetails from './Screens/Room/RoomDetails';
import BookingDetails from './Screens/Booking/BookingDetails';
import PaymentDetails from './Screens/Payment/PaymentDetails';
import ServiceDetails from './Screens/Services/ServiceDetails';
import Update from './Screens/Report/Update';
import Analysis from './Screens/Report/Analysis';


const App = () => {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/roomlist" element={<RoomList />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/paymentmethod" element={<PMethod/>} />
        <Route path="/Feedback" element={<Feedback/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/servicesrequest" element={<ServicesReq/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/manager" element={<Manager/>} />
        <Route path="/staff" element={<Staff/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/CustomerDetails" element={<CustomerDetails/>} />
        <Route path="/roomdetails" element={<RoomDetails/>} />
        <Route path="/bookingdetails" element={<BookingDetails/>} />
        <Route path="/paymentdetails" element={<PaymentDetails/>} />
        <Route path="/servicesdetails" element={<ServiceDetails/>} />
        <Route path="/reportupdate" element={<Update/>} />
        <Route path="/reportanalysis" element={<Analysis/>} />


        

        
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;