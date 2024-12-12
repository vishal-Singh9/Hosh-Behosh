import React, { useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../Dashboard/DashBoard";
import Orders from "../Orders/Orders";
import Menu from "../Menu/Menu";
import Events from "../Events/Events";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import RestaurantDetails from "./RestaurantDetails";
import CreateMenuForm from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategories,
} from "../../State/Restaurant/Action";
import { fetchRestaurantOrders } from "../../State/Restaurant Order/Action";

const Admin = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const handleClose = () => {};
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  useEffect(() => {
    dispatch(getRestaurantsCategories({ token, restaurantId }));
   
    // dispatch(getRestaurantById({ restaurantId ,token}));

    // dispatch(fetchRestaurantOrders({ token, restaurantId ,orderStatus:"PENDING"}));


  }, [dispatch, token, restaurantId]);
  return (
    <div className="lg:flex justify-between">
      <div>
        <AdminSideBar handleClose={handleClose} />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/category" element={<FoodCategory />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/events" element={<Events />} />
          <Route path="/details" element={<RestaurantDetails />} />
          <Route path="/add-menu" element={<CreateMenuForm />} />
        </Routes>
      </div>
    </div>

    
  );
};

export default Admin;
