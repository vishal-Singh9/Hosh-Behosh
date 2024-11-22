import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/Home/HomePage";
import RestaurantDetails from "../Restaurant/RestaurantDetails";
import Profile from "../Profile/Profile";
import Cart from "../components/Cart/Cart";
import Auth from "../components/Auth/Auth";
import CheckoutPage from "../components/CheckOutPage/CheckOutPage";
import ConfirmationPage from "../components/CheckOutPage/ConfirmationPage";
import Footer from "../components/Footer/Footer";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";

const CustomerRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/:register" element={<HomePage />} />
        <Route path="/restaurant/:city/:title/:id" element={<RestaurantDetails />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Auth />
      <Footer />
    </div>
  );
};

export default CustomerRoute;
