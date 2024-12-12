import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersOrders } from "../State/Order/Action";
import "/styles/Order.css";

const Orders = () => {
  const { auth, order } = useSelector((store) => store);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
const userId = auth.user?.userId;
  // const reqData = {
  //   token: token,
  //   userId: auth.user?.userId,
  // };


  useEffect(() => {
    if (userId && token) {
      dispatch(getUsersOrders({ token, userId }));
    }
  }, [userId, token]);
  

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-xl text-center oy-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
       {order?.orders?.length > 0 &&
        order.orders?.map((order) => order?.items?.map((item) =>
          <OrderCard key={item.orderId} order={order} item={item} />
        ))
       }
      </div>
    </div>
  );
};

export default Orders;
