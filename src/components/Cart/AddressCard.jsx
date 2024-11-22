import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Card,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAddress, selectAddress } from "../../State/Address/Action";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const AddressCard = ({ showButton, item }) => {
  const { address } = useSelector((store) => store);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(token, addressId))
      .then(() => {
        toast.success("Address deleted successfully!");
        navigate("/cart");
      })
      .catch((error) => {
        toast.error("Failed to delete address. Please try again.");
        console.error("Delete Address Error:", error);
      });
    setOpenConfirmDialog(false); // Close the dialog after deleting
  };

  const handleOpenDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleSelectAddress = (addressId) => {
    dispatch(selectAddress(addressId?.addressId));
  };

  return (
    <Card
      className="address-card p-5 relative shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Delete Button */}
      <div className="absolute top-2 right-2">
        <IconButton onClick={handleOpenDialog}>
          <Delete color="error" />
        </IconButton>
      </div>

      {/* Address Content */}
      <div className="flex gap-5 items-start">
        <div className="flex flex-col items-center">
          <HomeIcon color="primary" fontSize="large" />
        </div>

        <div className="address-details space-y-3">
          <h1 className="address-title font-semibold text-lg">Saved Address</h1>

          <p className="address-text text-gray-600">
            {item.street}, {item.city}, {item.state}
          </p>
          <p className="address-text text-gray-600">
            {item.pinCode}, {item.country}
          </p>

          {showButton && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => handleSelectAddress(item)}
              fullWidth
            >
              SELECT AND PROCEED
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to delete this address? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDeleteAddress(item.addressId)}
            color="error"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AddressCard;
