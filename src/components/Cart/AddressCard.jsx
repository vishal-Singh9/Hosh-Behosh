import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  const createOrderUsingSelectedAddress = () => {
    console.log(item);
  };

  return (
    <Card className="flex gap-5 w-64 p-5">
      <HomeIcon color="primary"/>
      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg ">Home</h1>
        <p>Chota Swarg, Thaltej,Ahemdabad</p>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              handleSelectAddress(createOrderUsingSelectedAddress);
            }}
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;