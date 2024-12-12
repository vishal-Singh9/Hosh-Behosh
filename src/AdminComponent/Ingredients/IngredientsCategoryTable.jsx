import { Create, Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import CreateIngredientCategory from "./CreateIngredientsCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIngredientCategory,
  getIngredientsOfRestaurant,
} from "../../State/Ingredients/Action";
import { toast } from "react-toastify";
import "/Users/indianic/Desktop/Swimmy/styles/IngredientsCategoryTable.css"; // Add custom CSS file

const IngredientCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { ingredients, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  const handleDelete = (id) => {
    dispatch(deleteIngredientCategory({ ingredientCategoryId: id, token }))
      .then(toast.success("Ingredient deleted successfully"))
      .then(() =>
        dispatch(
          getIngredientsOfRestaurant({
            restaurantId,
            token,
          })
        )
      );
  };

  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({ restaurantId, token }));
  }, [dispatch, restaurant]);

  return (
    <div className="ingredient-category-container">
      <Box>
        <Card className="ingredient-category-card">
          <CardHeader
            action={
              <IconButton
                onClick={handleOpen}
                aria-label="settings"
                className="create-button"
              >
                <Create />
              </IconButton>
            }
            title="Ingredient Category"
            sx={{ pt: 2, textAlign: "center" }}
          />
          <TableContainer component={Paper} className="table-container">
            <Table sx={{ minWidth: 450 }} aria-label="ingredient-table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients?.category?.map((row, index) => (
                  <TableRow key={row.ingredientCategoryId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleDelete(row.ingredientCategoryId)}
                        sx={{
                          backgroundColor: "#fff",
                          boxShadow: "0px 5px 10px rgba(255, 0, 0, 0.2)",
                          "&:hover": {
                            backgroundColor: "#fce4e4",
                          },
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <CreateIngredientCategory
              initialData={null}
              onClose={handleClose}
            />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default IngredientCategoryTable;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
  p: 4,
};
