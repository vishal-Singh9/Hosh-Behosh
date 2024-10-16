import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/Home/HomePage'
import RestaurantDetails from '../Restaurant/RestaurantDetails'
import Profile from '../Profile/Profile'
import Cart from '../components/Cart/Cart'
import Auth from '../components/Auth/Auth'

const CustomerRoute = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/account/:register' element={<HomePage />} />
        <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile/>} />
      </Routes>
      <Auth/>
    </div>
  )
}

export default CustomerRoute
