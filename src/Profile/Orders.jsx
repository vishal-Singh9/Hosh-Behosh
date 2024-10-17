import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersOrders } from "../State/Order/Action";

const Orders = () => {
  const { auth, order } = useSelector((store) => store);
console.log("ordersssss", order)
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const reqData = {
    token: token,
    userId: auth.user?.userId,
  };

  useEffect(() => {
    dispatch(getUsersOrders(reqData));
  }, [reqData.token]);

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-xl text-center oy-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
       {
        order.orders?.map((order,item) => (
          <OrderCard key={item.orderId} order={order} />
        ))
       }
       {console.log("orders", order)}
      </div>
    </div>
  );
};

export default Orders;
