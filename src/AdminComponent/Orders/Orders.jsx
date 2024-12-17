import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantOrders } from "../../State/Restaurant Order/Action";
import OrderTable from "./OrderTable";

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
  const [filterValue, setFilterValue] = useState(""); // Updated default to match "All" value
  const { restaurant } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId || ""; // Fallback to empty string

  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const selectedValue = e.target.value;
    setFilterValue(selectedValue); // Update filterValue state
    dispatch(
      fetchRestaurantOrders({
        token,
        orderStatus: selectedValue === "ALL" ? "" : selectedValue, // Pass empty string for "ALL"
        restaurantId,
      })
    );
  };

  return (
    <div className="px-2">
      <Card className="p-4">
        <Typography sx={{ paddingBottom: "1rem" }}>Order Status</Typography>
        <FormControl>
          <RadioGroup
            onChange={handleFilter}
            row
            name="category"
            value={filterValue} // Bind to state
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
      <OrderTable filterValue={filterValue} />
    </div>
  );
};

export default Orders;
