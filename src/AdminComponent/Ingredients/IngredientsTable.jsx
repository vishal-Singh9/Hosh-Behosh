import { Create, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
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
import CreateIngredientForm from "./CreateIngredientsForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIngredient,
  getIngredients,
} from "../../State/Ingredients/Action";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
  borderRadius: "15px",
  p: 4,
  overflow: "hidden",
};

const IngredientsTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { ingredients, restaurant } = useSelector((store) => store);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  const handleDelete = (id) => {
    dispatch(deleteIngredient({ ingredientsItemId: id, token }))
      .then(toast.success("Ingredient deleted successfully"))
      .then(() =>
        dispatch(
          getIngredients({
            restaurantId,
            token,
          })
        )
      );
  };

  useEffect(() => {
    dispatch(getIngredients({ restaurantId, token }));
  }, [dispatch, restaurant]);

  return (
    <div>
      <Box sx={{ padding: "2rem", background: "#f7f9fc" }}>
        <Card
          className="mt-2"
          sx={{
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "15px",
            overflow: "hidden",
            background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
          }}
        >
          <CardHeader
            action={
              <IconButton
                onClick={handleOpen}
                aria-label="add ingredient"
                sx={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <Create />
              </IconButton>
            }
            title="Ingredients"
            sx={{
              textAlign: "center",
              color: "#333",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          />

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="ingredients table">
              <TableHead>
                <TableRow sx={{ background: "#f0f4f8" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Availability
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(ingredients?.ingredients) &&
                  ingredients?.ingredients?.map((row, index) => (
                    <TableRow
                      key={row.ingredientsItemId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.category?.name || "N/A"}</TableCell>
                      <TableCell>
                        {row.inStoke ? "In Stock" : "Out of Stock"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          aria-label="delete"
                          onClick={() => handleDelete(row.ingredientsItemId)}
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

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-ingredient-modal"
            aria-describedby="add-ingredient-form"
          >
            <Box sx={style}>
              <CreateIngredientForm initialData={null} onClose={handleClose} />
            </Box>
          </Modal>
        </Card>
      </Box>
    </div>
  );
};

export default IngredientsTable;
