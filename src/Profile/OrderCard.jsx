import { Card } from "@mui/material";
import React from "react";
import {Button} from "@mui/material";


const OrderCard = ({item,order}) => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex item-center space-x-5">
        <img
          className="h-16 w-16 "
          src={item?.items[0]?.food?.images[0]}
          alt=""
        />
        <div>
          <p>{item?.items?.name}</p>
          <p>₹ {item?.items?.totalPrice}</p>
        </div>

      </div>
      <div>
        <Button  className="cursor-not-allowed">{order.orderStatus}</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
