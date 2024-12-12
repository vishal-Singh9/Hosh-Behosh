import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";
import { createOrder } from "../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../State/Cart/Action";
import { selectAddress } from "../../State/Address/Action";

const CheckoutPage = () => {
  const { cart, restaurant, address } = useSelector((store) => store);
  const { selectedAddress } = useSelector((store) => store.address);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handlePayment = () => {
    if (paymentMethod === "cod") {
    } else if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill in all card details.");
        return;
      }
    }
    setCardDetails({
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    const deliveryAddress = {
      street: address.selectedAddress?.street,
      city: address.selectedAddress?.city,
      state: address.selectedAddress?.state,
      pinCode: address.selectedAddress?.pinCode,
      country: "India",
    };
    const restaurantId = restaurant?.restaurant?.restaurantId
    console.log(restaurantId)
    dispatch(createOrder(token, deliveryAddress, restaurantId));

    navigate("/confirmation");
    dispatch(clearCart(token));
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #ece9e6, #ffffff)",
        p: { xs: 3, lg: 10 },
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Order Summary Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 4,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              borderRadius: 3,
              background: "white",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 4,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Order Summary
            </Typography>

            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                Selected Address
              </Typography>
              <Typography>{selectedAddress?.street}</Typography>
              <Typography>
                {selectedAddress?.city}, {selectedAddress?.state}
              </Typography>
              <Typography>{selectedAddress?.pinCode}</Typography>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#555",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Food Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#555",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#555",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Total Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart?.cartItems.map((item) => (
                  <TableRow key={item.cartItemId}>
                    <TableCell>{item?.food?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>₹{item.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  color: "#777",
                }}
              >
                <Typography>Item Price:</Typography>
                <Typography>₹{cart?.cart?.total}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  color: "#777",
                }}
              >
                <Typography>Delivery Fee:</Typography>
                <Typography>₹49</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  color: "#777",
                }}
              >
                <Typography>Platform Fee:</Typography>
                <Typography>₹11</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  mt: 2,
                  color: "#333",
                }}
              >
                <Typography>Total:</Typography>
                <Typography>₹{(cart?.cart?.total || 0) + 49 + 11}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Payment Options Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 4,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              borderRadius: 3,
              background: "white",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 4,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Payment Options
            </Typography>

            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on Delivery"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
            </RadioGroup>

            {paymentMethod === "card" && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Card Number"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cardNumber: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Expiry Date"
                  placeholder="MM/YY"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
                <TextField
                  label="CVV"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </Box>
            )}

            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<PaymentIcon />}
                  onClick={handlePayment}
                  sx={{
                    fontWeight: "bold",
                    background: "#3f51b5",
                    "&:hover": {
                      background: "#303f9f",
                    },
                  }}
                >
                  Place Order
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  size="large"
                  startIcon={<CancelIcon />}
                  onClick={() => alert("Payment canceled")}
                  sx={{
                    fontWeight: "bold",
                    color: "#f50057",
                    borderColor: "#f50057",
                    "&:hover": {
                      borderColor: "#c51162",
                      color: "#c51162",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
