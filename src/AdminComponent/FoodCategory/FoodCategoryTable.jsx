import React, { useState, useEffect } from "react";
import { Create, Delete } from "@mui/icons-material";
import {
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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CreateFoodCategory from "./CreateFoodCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRestaurantCategory,

  getRestaurantsCategories,
} from "../../State/Restaurant/Action";
import { toast } from "react-toastify";

const FoodCategoryTable = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const restaurantId = restaurant?.userRestaurants?.restaurantId;
  const token = localStorage.getItem("token");

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteRestaurantCategory({ categoryId: id, token }))
      .then(toast.success("Category deleted successfully"))
      .then(() =>
        dispatch(
          getRestaurantsCategories({
            restaurantId,
            token,
          })
        )
      );
  };

  useEffect(() => {
    dispatch(getRestaurantsCategories({ token, restaurantId }));
  }, [dispatch, token, restaurant?.userRestaurants?.restaurantId]);

  return (
    <div style={{ padding: "20px", background: "linear-gradient(145deg, #e6e6e6, #ffffff)", borderRadius: "15px", boxShadow: "5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff" }}>
      <Box>
        <Card
          style={{
            borderRadius: "15px",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.7)",
            padding: "20px",
            background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          }}
        >
          <CardHeader
            action={
              <IconButton
                onClick={() => handleOpenModal(null)}
                aria-label="add"
                style={{
                  background: "linear-gradient(145deg, #d3d3d3, #ffffff)",
                  boxShadow: "3px 3px 6px #bebebe, -3px -3px 6px #ffffff",
                }}
              >
                <Create />
              </IconButton>
            }
            title="Food Category"
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              paddingBottom: "10px",
            }}
          />

          <TableContainer
            component={Paper}
            style={{
              borderRadius: "10px",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.7)",
              overflow: "hidden",
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              style={{
                background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
              }}
            >
              <TableHead
                style={{
                  background: "linear-gradient(145deg, #d4d4d4, #f2f2f2)",
                }}
              >
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", color: "#555" }}>Id</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#555" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#555" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurant?.categories?.map((row, index) => (
                  <TableRow
                    key={index}
                    style={{
                      background: index % 2 === 0 ? "linear-gradient(145deg, #f5f5f5, #ffffff)" : "linear-gradient(145deg, #ffffff, #f5f5f5)",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleDelete(row.categoryId)}
                        style={{
                          background: "linear-gradient(145deg, #ffdddd, #ffffff)",
                          boxShadow: "3px 3px 6px #ffbbbb, -3px -3px 6px #ffffff",
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <DialogTitle
          style={{
            background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {selectedCategory ? "Edit Food Category" : "Create Food Category"}
        </DialogTitle>
        <DialogContent>
          <CreateFoodCategory
            initialData={selectedCategory}
            onClose={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodCategoryTable;
