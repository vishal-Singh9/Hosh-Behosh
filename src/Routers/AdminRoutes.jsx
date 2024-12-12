import React from 'react'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import Admin from '../AdminComponent/Admin/Admin'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AdminRoutes = () => {
  const{restaurant} = useSelector(store=>store)
  return (
    <div>
        <h1>Admin/Restaurants</h1>
      <Routes>
        <Route path="/*" element={!restaurant?.userRestaurants ? <CreateRestaurantForm/> : <Admin/>}>

        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
