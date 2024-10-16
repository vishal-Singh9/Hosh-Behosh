import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../State/Order/Action'; 
import { Box, Typography, List, ListItem, CircularProgress } from '@mui/material';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    const reqData = {
      orderId: localStorage.getItem('orderId'),
      token: localStorage.getItem('token'),
    };
    dispatch(getUsersOrders(reqData));
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to fetch orders: {error.message}</Typography>;

  return (
    <Box mt={5}>
      <Typography variant="h5" mb={2}>
        Your Orders
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <Box>
              <Typography variant="body1">Food Item: {order.foodItem}</Typography>
              <Typography variant="body2">Quantity: {order.quantity}</Typography>
              <Typography variant="body2">Address: {order.address}</Typography>
              <Typography variant="body2">Status: {order.status}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Orders;
