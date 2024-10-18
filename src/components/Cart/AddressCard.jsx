import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";
import "/Users/indianic/Desktop/Swimmy/styles/AddressCard.css"
const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  const createOrderUsingSelectedAddress = () => {
    console.log(item);
  };

  return (
    <Card className="address-card flex gap-5 p-5">
      <div className="icon-wrapper">
        <HomeIcon color="primary" fontSize="large" />
      </div>
      <div className="address-details space-y-3">
        <h1 className="address-title font-semibold text-lg">Home</h1>
        <p className="address-text">Chota Swarg, Thaltej, Ahemdabad</p>
        {showButton && (
          <Button
            className="select-button"
            variant="contained"
            fullWidth
            onClick={() => handleSelectAddress(createOrderUsingSelectedAddress)}
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
