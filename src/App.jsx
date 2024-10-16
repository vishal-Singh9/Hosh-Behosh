import React, { useEffect } from "react";
import "./App.css";

import CustomerRoute from "./Routers/CustomerRoute.jsx";
import { getUser } from "./State/Authentication/Action.js";
import { useDispatch, useSelector } from "react-redux";
import { findCart } from "./State/Cart/Action.js";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);


  useEffect(() => {
    if(token) {
      dispatch(getUser(auth.token || token));
      dispatch(findCart(token))

    }
  }, [auth.token]);

  
  return (
    <>
      <CustomerRoute />
    </>
  );
}

export default App;
