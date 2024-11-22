import { Card } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import "/styles/OrderCard.css";

const OrderCard = ({ order, item }) => {
  console.log("order", order);
  return (
    <Card className="order-card">
      <div className="item-details">
        <img
          className="food-img"
          src={item?.food?.images[0]}
          alt={item?.food?.name}
        />
        <div className="details-text">
          <p>{item?.food?.name}</p>
          <p>₹ {item?.food?.price}</p>
        </div>
      </div>
      <div>
        <Button className="status-button">{order.orderStatus}</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
