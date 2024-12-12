import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Cartitem from "./Cartitem";
import AddressCard from "./AddressCard";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentIcon from "@mui/icons-material/Payment";

import {
  createAddress,
  selectAddress,
  userAddress,
} from "../../State/Address/Action";
import { useNavigate } from "react-router-dom";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#f9fafc",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  p: 4,
};

const initialValues = {
  street: "",
  state: "",
  pinCode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  street: Yup.string().required("Street Address is Required"),
  state: Yup.string().required("State is Required"),
  pinCode: Yup.string().required("PinCode is Required"),
  city: Yup.string().required("City is Required"),
});

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { cart, auth, address, order, restaurant } = useSelector(
    (store) => store
  );

  console.log("cart", cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const restaurantId= restaurant?.restaurants?.map((res) => res.restaurantId);
  const handleClose = () => setOpen(false);

  const handleSaveAddress = (values) => {
    const token = localStorage.getItem("token");
    const userId = auth.user?.userId;

    const reqData = {
      ...values,
      country: "India",
    };

    if (saveAddress) {
      dispatch(createAddress(reqData, token, userId))
        .then(() => {
          toast.success("Address saved successfully!");
          dispatch(userAddress(token, userId));
        })
        .catch(() => {
          toast.error("Failed to save address");
        });
      setOpen(false);
    }
  };

  const handleSelectAddress = (address) => {
    console.log("addresseofugh", address);
    dispatch(selectAddress(address));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = auth?.user?.userId;

    if (token && userId) {
      dispatch(userAddress(token, userId));
    }
  }, [auth]);

  const handleBuyNow = () => {
    if (!address.selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }
    if (!cart.cart?.total) {
      toast.error("Your cart is empty.");
      return;
    }
    if (address.selectedAddress) {
      navigate("/checkout");
      toast.success("Proceeding to payment...");
    }
  };

  return (
    <div className="cart-container bg-[#f0f4f7] p-6 lg:p-10 min-h-screen">
      <main className="lg:flex justify-between">
        {/* Cart Items Section */}
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10 bg-white rounded-lg shadow-lg p-5">
          {cart.cartItems?.map((item) => (
            <Cartitem key={item.cartItemId} item={item} />
          ))}
          <Divider />
          {/* Bill Details */}
          <div className="bill-details px-5 text-sm">
            <Typography className="text-lg py-5 text-gray-800" variant="h6">
              Bill Details
            </Typography>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-800">
                <Typography>Item Price</Typography>
                <Typography>₹ {cart?.cart?.total}</Typography>
              </div>
              <div className="flex justify-between text-gray-800">
                <Typography>Delivery Fee</Typography>
                <Typography>₹ 49</Typography>
              </div>
              <div className="flex justify-between text-gray-800">
                <Typography>Platform Fee</Typography>
                <Typography>₹ 11</Typography>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-black font-semibold">
              <Typography>Total Amount</Typography>
              <Typography>₹ {cart?.cart?.total + 49 + 11}</Typography>
            </div>
            <br />
            <br />

            {address.selectedAddress && (
              <Card
                className="selected-address-card"
                onClick={() => handleSelectAddress(selectedAddress)}
              >
                <Typography variant="h6" color="primary">
                  Selected Address
                </Typography>
                <p>
                  {address.selectedAddress?.street},{" "}
                  {address.selectedAddress?.city},
                  {address.selectedAddress?.state},{" "}
                  {address.selectedAddress?.pinCode}
                </p>
              </Card>
            )}

            {/* Buy Now Button */}
            <div className="flex justify-center mt-8">
              <Button
                variant="contained"
                color="primary"
                onClick={handleBuyNow}
                startIcon={<PaymentIcon />}
                className="w-1/2 lg:w-full"
              >
                Proceed To payment
              </Button>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        {/* Delivery Address Section */}
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <Typography
              className="text-center text-2xl font-semibold py-10 text-[#007bff]"
              variant="h4"
            >
              Choose Delivery Address
            </Typography>
            <div className="flex justify-center gap-5 flex-wrap">
              {address.addresses?.map((item) => (
                <AddressCard
                  key={item}
                  item={item}
                  showButton={true}
                  handleSelectAddress={(address) => setSelectedAddress(address)}
                  className="hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              ))}

              {/* Add New Address Card */}
              <Card className="flex gap-5 w-64 p-5 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-[#f9fafa] rounded-lg cursor-pointer hover:bg-[#dde8f5] hover:text-white">
                <AddLocationAltIcon color="primary" fontSize="large" />
                <div className="space-y-3 text-gray-500">
                  <Typography className="font-semibold text-lg">
                    Add New Address
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setOpen(true)}
                    className="hover:bg-white hover:text-[#b2d3f9]"
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      {/* Add Address Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSaveAddress}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <ClearIcon
                    onClick={handleClose}
                    className="cursor-pointer"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 8,
                      cursor: "pointer",
                    }}
                  />
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="street"
                      label="Street"
                      fullWidth
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="pinCode"
                      label="PinCode"
                      fullWidth
                      variant="outlined"
                      required
                      type="string"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={saveAddress}
                          onChange={(e) => setSaveAddress(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Save this address"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Save Address
                    </Button>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
