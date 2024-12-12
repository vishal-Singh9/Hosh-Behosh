import { Create, Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMenuItem, getMenuItems } from "../../State/Menu/Action";

const MenuTable = () => {
  const dispatch = useDispatch();
  const { menu, restaurant } = useSelector((store) => store);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  const handleDelete = (id) => {
    dispatch(deleteMenuItem({ foodId: id, token })).then(
      dispatch(getMenuItems({ restaurantId, token }))
    );
  };

  useEffect(() => {
    dispatch(getMenuItems({ restaurantId, token }));
  }, [dispatch, token, restaurantId]);

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurants/add-menu")}
              aria-label="add menu"
              sx={{ color: "primary.main" }}
            >
              <Create />
            </IconButton>
          }
          title={<Typography variant="h5">Menu</Typography>}
          sx={{
            backgroundColor: "primary.light",
            color: "white",
            textAlign: "center",
            py: 2,
          }}
        />

        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="menu table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                  Title
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                  Ingredients
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                  Price
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                  Availability
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu?.menuItems?.length > 0 ? (
                menu?.menuItems?.map((val, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "action.hover",
                      },
                      "&:hover": {
                        backgroundColor: "action.selected",
                      },
                    }}
                  >
                    <TableCell>
                      <Avatar src={val.images} alt={val.name} />
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "medium" }}>
                      {val.name}
                    </TableCell>
                    <TableCell align="right">
                      {val?.ingredients?.map((ing, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          component="span"
                          sx={{ mx: 0.5 }}
                        >
                          {ing.name}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "medium" }}>
                      ₹ {val.price}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: val.available ? "success.main" : "error.main" }}
                    >
                      {val.available ? "In Stock" : "Out of Stock"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDelete(val.foodId)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No menu items available.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
