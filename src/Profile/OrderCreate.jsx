// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createOrder } from "../State/Order/Action"; // import your createOrder action
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Grid,
//   MenuItem,
// } from "@mui/material";

// const CreateOrderForm = () => {
//   const dispatch = useDispatch();

//   // State for form fields
//   const [restaurantId, setRestaurantId] = useState(0);
//   const [deliveryAddress, setDeliveryAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//   });

//   const handleChange = (e) => {
//     setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setDeliveryAddress({
//       ...deliveryAddress,
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "",
//     });

//     const orderData = {
//       restaurantId: Number(restaurantId),
//       deliveryAddress,
//     };

//     dispatch(createOrder(orderData));
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//       <Typography variant="h5" mb={2}>
//         Create a Food Order
//       </Typography>

//       <TextField
//         label="Restaurant ID"
//         select
//         value={restaurantId}
//         onChange={(e) => setRestaurantId(Number(e.target.value))}
//         fullWidth
//         margin="normal"
//         required
//       >
//         <MenuItem value={1}>Restaurant 1</MenuItem>
//         <MenuItem value={2}>Restaurant 2</MenuItem>
//         <MenuItem value={3}>Restaurant 3</MenuItem>
//       </TextField>

//       <Typography variant="h6" mt={3} mb={2}>
//         Delivery Address
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             label="Street"
//             name="street"
//             value={deliveryAddress.street}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="City"
//             name="city"
//             value={deliveryAddress.city}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="State"
//             name="state"
//             value={deliveryAddress.state}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Zip Code"
//             name="zipCode"
//             value={deliveryAddress.zipCode}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Country"
//             name="country"
//             value={deliveryAddress.country}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//         </Grid>
//       </Grid>

//       <Button
//         // type="submit
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ mt: 3 }}
//       >
//         Place Order
//       </Button>
//     </Box>
//   );
// };

// export default CreateOrderForm;
