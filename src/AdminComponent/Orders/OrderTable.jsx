import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderStatus,
  fetchRestaurantOrders,
  updateOrderStatus,
} from "../../State/Restaurant Order/Action";
import { Delete } from "@mui/icons-material";

const orderStatus = [
  { label: "All",value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
];

const OrderTable = ({ filterValue }) => {
  const dispatch = useDispatch();
  const { restaurantOrder, restaurant, auth } = useSelector((store) => store);
  const restaurantId = restaurant?.userRestaurants?.restaurantId;
  const token = localStorage.getItem("token");
  const [idStore, setIdStore] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    dispatch(
      fetchRestaurantOrders({ restaurantId, orderStatus: filterValue, token })
    );
  }, [dispatch, token, restaurantId, filterValue]);

  const handleUpdateOrder = ({ orderStatus }) => {
    dispatch(updateOrderStatus({ orderId: idStore, orderStatus, token }))
      .then(() => {
        dispatch(
          fetchRestaurantOrders({
            restaurantId,
            orderStatus: filterValue,
            token,
          })
        );
      })
      .catch((error) => console.error("Failed to update order status:", error));
    handleClose();
  };

  const deleteOrder = ({ orderId }) => {
    dispatch(deleteOrderStatus({ orderId, token })).then(() => {
      dispatch(
        fetchRestaurantOrders({ restaurantId, orderStatus: filterValue, token })
      );
    });
  };

  return (
    <Box p={3} bgcolor="#f9f9f9">
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="bold">
              All Orders
            </Typography>
          }
          sx={{
            backgroundColor: "#2196f3",
            color: "#fff",
            textAlign: "center",
            py: 2,
          }}
        />
      </Card>
      <TableContainer
        component={Paper}
        sx={{ mt: 3, boxShadow: 2, borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f1f1" }}>
            <TableRow>
              {[
                "Id",
                "Image",
                "Customer",
                "Price",
                "Quantity",
                "Name",
                "Ingredients",
                "Status",
                "Update",
                "Delete",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  align={index > 0 ? "right" : "left"}
                  sx={{ fontWeight: "bold" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantOrder?.orders?.map((order, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f9f9f9" },
                  transition: "background-color 0.3s",
                }}
              >
                <TableCell>{order.orderId}</TableCell>

                <TableCell align="right">
                  {order?.items?.map((item, idx) => (
                    <Avatar
                      key={idx}
                      src={item?.food?.images?.[0]}
                      alt="Food image"
                      sx={{ width: 40, height: 40, mx: 1 }}
                    />
                  ))}
                </TableCell>
                <TableCell align="right">{order?.customer?.fullName}</TableCell>
                <TableCell align="right">{order.totalPrice}</TableCell>
                <TableCell align="right">
                  {order?.items.map((item) => item?.quantity)}
                </TableCell>

                <TableCell align="right">
                  {order.items?.map((item) => item?.food?.name).join(", ")}
                </TableCell>
                <TableCell align="right">
                  {order.items
                    ?.map((item) =>
                      item?.ingredients?.map((ing) => ing).join(", ")
                    )
                    .join(", ")}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={order?.orderStatus}
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  {/* <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleClick}
                  >
                  
                  </Button> */}
                  <span onClick={() => setIdStore(order?.orderId)}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={handleClick}
                    >
                      Update
                    </Button>
                  </span>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ "aria-labelledby": "basic-button" }}
                  >
                    {orderStatus.map((status) => (
                      <MenuItem
                        key={status.value}
                        onClick={() =>
                          handleUpdateOrder({
                            orderId: order?.orderId,
                            orderStatus: status.value,
                          })
                        }
                      >
                        {status.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => deleteOrder({ orderId: order?.orderId })}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;
