import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import CustomerRoute from "./CustomerRoute";
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/restaurants/*" element={<AdminRoutes />} />
        <Route path="/*" element={<CustomerRoute />} />
      </Routes>
    </div>
  );
};

export default Routers;
