import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Cartitem from "./Cartitem";
import AddressCard from "./AddressCard";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../State/Order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#f9fafc", // Light background for modal
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  p: 4,
};

const initialValues = {
  StreetAddress: "",
  State: "",
  PinCode: "",
  City: "",
};

const validationSchema = Yup.object().shape({
  StreetAddress: Yup.string().required("Street Address is Required"),
  State: Yup.string().required("State is Required"),
  PinCode: Yup.number().required("PinCode is Required"),
  City: Yup.string().required("City is Required"),
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const handleSubmit = (value) => {
    const token = localStorage.getItem("token");
    const reqData = {
      token: token,
      deliveryAddress: {
        fullName: auth.user?.fullName,
        street: value.StreetAddress,
        state: value.State,
        city: value.City,
        zipCode: value.PinCode,
        country: "India",
      },
      restaurantId: cart?.cart?.customer?.favorites[0]?.restaurantId,
    };

    dispatch(createOrder(reqData));
    setOpen(false);
  };

  const handleOpenAddressModel = () => {
    setOpen(true);
  };

  const createOrderUsingSelectedAddress = () => {};

  return (
    <div className="cart-container bg-[#f0f4f7] p-6 lg:p-10 min-h-screen">
      <main className="lg:flex justify-between">
        {/* Cart Items Section */}
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10 bg-white rounded-lg shadow-lg p-5">
          {cart.cartItems?.map((item) => {
            return <Cartitem key={item.cartItemId} item={item} />;
          })}
          <Divider />
          {/* Bill Details */}
          <div className="bill-details px-5 text-sm">
            <Typography className="text-lg py-5 text-gray-800" variant="h6">
              Bill Details
            </Typography>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-800">
                <Typography>Item Total</Typography>
                <Typography>₹ {cart.cart?.total}</Typography>
              </div>
              <div className="flex justify-between text-gray-800">
                <Typography>Deliver Fee</Typography>
                <Typography>₹ 49</Typography>
              </div>
              <div className="flex justify-between text-gray-800">
                <Typography>Platform Fee</Typography>
                <Typography>₹ 234</Typography>
              </div>
              <div className="flex justify-between text-gray-800">
                <Typography>Registration and Delivery Charge</Typography>
                <Typography>₹ 599</Typography>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-800 font-semibold">
              <Typography>Total Pay</Typography>
              <Typography>₹ {cart.cart?.total + 234 + 49 + 599}</Typography>
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
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return (
                  <AddressCard
                    key={item}
                    showButton={true}
                    handleSelectAddress={createOrderUsingSelectedAddress}
                    className="hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                );
              })}
              {/* Add New Address Card */}
              <Card className="flex gap-5 w-64 p-5 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-[#f9fafa] rounded-lg cursor-pointer hover:bg-[#007bff] hover:text-white">
                <AddLocationAltIcon color="primary" fontSize="large" />
                <div className="space-y-3 text-gray-500">
                  <Typography className="font-semibold text-lg">
                    Add New Address
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModel}
                    className="hover:bg-white hover:text-[#007bff]"
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
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <ClearIcon
                    onClick={handleClose}
                    className="cursor-pointer "
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
                      name="StreetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="State"
                      label="State"
                      fullWidth
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="PinCode"
                      label="PinCode"
                      fullWidth
                      variant="outlined"
                      required
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="City"
                      label="City"
                      fullWidth
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      Deliver Here
                    </Button>
                  </Grid>
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
