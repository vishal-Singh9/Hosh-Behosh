import { Card } from "@mui/material";
import React from "react";
import {Button} from "@mui/material";


const OrderCard = () => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex item-center space-x-5">
        <img
          className="h-16 w-16 "
          src="https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt=""
        />
        <div>
          <p>Biryani</p>
          <p>₹ 599</p>
        </div>

      </div>
      <div>
        <Button  className="cursor-not-allowed">Completed</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
