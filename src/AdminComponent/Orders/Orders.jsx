import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantOrders } from "../../State/Restaurant Order/Action";

const orderStatus = [
  {
    label: "All",
    
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Out For Delivery",
    value: "OUT_FOR_DELIVERY",
  },
];
const Orders = () => {
  const [filterValue, setFilterValue] = useState("");
  const { order, restaurantOrder ,restaurant} = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  const dispatch = useDispatch();

 
  const handleFilter = (e) => {
    dispatch(fetchRestaurantOrders({ token, orderStatus: e.target.value,restaurantId }));
    setFilterValue(e.target.value);
  };

  return (
    <div className="px-2">
      <Card className="p-4">
        <Typography sx={{ paddingBottom: "1 rem" }}>Order Status</Typography>
        <FormControl>
          <RadioGroup
            onChange={handleFilter}
            row
            name="category"
            value={filterValue || "all"}
          >
            {orderStatus.map((item) => (
              <div key={item.value}>
                <FormControlLabel
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable filterValue={filterValue}></OrderTable>
    </div>
  );
};

export default Orders;
