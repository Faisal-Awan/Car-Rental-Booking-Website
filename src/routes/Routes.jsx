import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import ServiceDetails from '../pages/ServiceDetails';
import CarRental from '../pages/CarRental';
import CarBooking from '../pages/CarBooking';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import PersonDetail from '../pages/PersonDetail'

import Checkout from '../pages/Checkout';
import Blogs from '../pages/Blogs';
import BlogDetails from '../pages/BlogDetails';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import RentalList from '../pages/RentList';
import AddCarForm from '../pages/AddCars';
import UpdateRentalForm from '../pages/UpdateRental';
import CarList from '../pages/CarList';
import CarUpdate from '../pages/UpdateCar';

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />

      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/service-details/:id" element={<ServiceDetails />} />
      <Route path="/car-listing" element={<CarRental />} />
      <Route path="/car-details/:id" element={<CarBooking />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog-details/:id" element={<BlogDetails />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/personDetail/:carId" element={<PersonDetail />} />
      <Route path="/rentalList" element={<RentalList />} />
      <Route path="/carList" element={<CarList />} />
      <Route path="/addCars" element={<AddCarForm />} />
      {/* <Route path="/updateRental/:id" element={<UpdateRentalForm />} /> */}
      <Route path="/updateRental/:CarId" element={<UpdateRentalForm />} />
      <Route path="/updateCar/:id" element={<CarUpdate />} />


      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default routes;
