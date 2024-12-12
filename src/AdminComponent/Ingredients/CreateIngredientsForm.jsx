import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  createIngredient,
  getIngredients,
} from "../../State/Ingredients/Action";

const CreateIngredientForm = ({ initialData, onClose }) => {
  const { ingredients, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    ingredientCategoryId: initialData?.ingredientCategoryId || "", // Use a default value like 0 if needed
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const reqData = {
      name: formData.name,
      ingredientCategoryId: formData.ingredientCategoryId || 1,
      restaurantId: restaurantId,
    };

    dispatch(createIngredient({ reqData, restaurantId, token }))
    .then(() => dispatch(getIngredients({ restaurantId, token })))
    onClose();
  };

  useEffect(() => {
    if (!formData.ingredientCategoryId && ingredients?.ingredients.length > 0) {
      setFormData((prev) => ({
        ...prev,
        ingredientCategoryId: ingredients.ingredients[0].category.id,
      }));
    }
  }, [ingredients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Create Ingredient</h1>

      {/* Close Button */}
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

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Ingredient"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
          margin="normal"
        />

<FormControl fullWidth margin="normal">
  <InputLabel id="ingredient-category-label">Category</InputLabel>
  <Select
    labelId="ingredient-category-label"
    id="ingredientCategoryId"
    name="ingredientCategoryId"
    value={formData.ingredientCategoryId ?? 0} // Ensure a valid default value
    label="Category"
    onChange={handleInputChange}
  >
    {/* Default option */}
    <MenuItem value={0} disabled>
      Select Category
    </MenuItem>
    {ingredients?.category?.map((item) => (
      <MenuItem
        key={item.ingredientCategoryId}
        value={item.ingredientCategoryId}
      >
        {item.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button type="submit" variant="contained" color="primary">
            {initialData?.name ? "Update Category" : "Create Category"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateIngredientForm;
