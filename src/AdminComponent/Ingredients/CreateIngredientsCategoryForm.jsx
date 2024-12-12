import React, { useState, useEffect } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  createIngredientCategory,
  getIngredientsOfRestaurant,
} from "../../State/Ingredients/Action";

const CreateIngredientCategory = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const { ingredients, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      name: formData.name,
      restaurantId: restaurantId,
    };

    dispatch(createIngredientCategory({reqData, token}));
    dispatch(getIngredientsOfRestaurant({restaurantId, token}));
  onClose()
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Create Ingredient Category</h1>
      <form onSubmit={handleSubmit}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
          }}
        >
          <CloseIcon />
        </IconButton>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Category"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {initialData ? "Update Category" : "Create Category"}
        </Button>
      </form>{" "}
    </div>
  );
};

export default CreateIngredientCategory;
