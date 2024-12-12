import React, { useEffect } from "react";
import "./App.css";

import { getUser } from "./State/Authentication/Action.js";
import { useDispatch, useSelector } from "react-redux";

import { findCart } from "./State/Cart/Action.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./Routers/Routers.jsx";
import { getRestaurantByUserId } from "./State/Restaurant/Action.js";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (token) {
      dispatch(getUser(auth.token || token));
      dispatch(findCart(token));
    }
  }, [auth.token]);

  useEffect(() => {
    if (auth.user) {
      dispatch(getRestaurantByUserId(auth?.user?.token || token));
      
    }
  },[auth.token])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
   <Routers/>
    </>
  );
}

export default App;
