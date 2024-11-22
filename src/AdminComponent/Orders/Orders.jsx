import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderTable from "./OrderTable";

const orderStatus = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];
const Orders = () => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = (e) => {
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
            {
              orderStatus.map((item) => (
                <div key={item.value}>
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                </div>
              ))
            }
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable>
        
      </OrderTable>
    </div>
  );
};

export default Orders;
