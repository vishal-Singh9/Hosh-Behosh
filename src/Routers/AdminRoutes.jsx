import React from 'react'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import Admin from '../AdminComponent/Admin/Admin'
import { Route, Routes } from 'react-router-dom'
const AdminRoutes = () => {
  return (
    <div>
        <h1>Admin/Restaurants</h1>
      <Routes>
        <Route path="/*" element={false ? <CreateRestaurantForm/> : <Admin/>}>

        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
