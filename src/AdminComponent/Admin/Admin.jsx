import React from "react";
import AdminSideBar from "./AdminSideBar";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../Dashboard/DashBoard";
import Orders from "../Orders/Orders";
import Menu from "../Menu/Menu";
import Events from "../Events/Events";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import RestaurantDetails from "./RestaurantDetails";

const Admin = () => {
  const handleClose = () => {};
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
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
