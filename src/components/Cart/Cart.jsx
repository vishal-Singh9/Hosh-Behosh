import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Cartitem from "./Cartitem";
import AddressCard from "./AddressCard";
import * as Yup from "yup";
import { Formik, Field, useField,Form } from "formik";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
const items = [1, 2];

 export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
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
const {cart} = useSelector((store) => store)


  const handleClose = () => setOpen(false);

  const handleSubmit = (value) => {
    console.log("Form value", value);
    setOpen(false)
  };

  const handleOpenAddressModel = () => {
    setOpen(true);
  };

  const createOrderUsingSelectedAddress = () => {};

  return (
    <div>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cart?.items.map((item) => {
            return <Cartitem key={item} item={item} />;
          })}
          {console.log("cart 1 2 3", cart.cart?.items)}
          <Divider />
          <div className="bilDeatails px-5 text-sm">
            <p className="text-lg py-5 text-gray-800">Bill Details</p>
            <div className="space-y-3 ">
              <div className="flex justify-between text-gray-800">
                <p>Item Total</p>
                <p>₹ 599</p>
              </div>
              <div className="flex justify-between text-gray-800">
                <p>Deliver Fee</p>
                <p>₹ 212</p>
              </div>
              <div className="flex justify-between text-gray-800">
                <p>Platform Fee</p>
                <p>₹ 599</p>
              </div>
              <div className="flex justify-between text-gray-800">
                <p>Registration and Delivery Charge</p>
                <p>₹ 599</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-800">
              <p>Total Pay</p>
              <p>₹ 1599</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0 ">
          <div>
            <h1 className="text-center text-2xl font-semibold py-10">
              Choose Delivery Address
            </h1>
            <div className="flex justify-center gap-5 flex-wrap ">
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return (
                  <AddressCard
                    key={item}
                    showButton={true}
                    handleSelectAddress={createOrderUsingSelectedAddress}
                  />
                );
              })}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon color="primary" />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg">Add New Address</h1>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModel}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "black",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      borderColor: "primary.main",
                    },
                  }}
                >
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="State"
                      label="State"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="PinCode"
                      label="PinCode"
                      fullWidth
                      variant="outlined"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
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
