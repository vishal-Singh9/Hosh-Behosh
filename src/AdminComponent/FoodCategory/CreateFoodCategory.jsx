import React, { useState, useEffect } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction, getRestaurantsCategories } from "../../State/Restaurant/Action";


const CreateFoodCategory = ({ initialData, onClose }) => {
  const dispatch = useDispatch();
  const {restaurant}=useSelector(store=>store)
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });
  const restaurantId = restaurant?.userRestaurants?.restaurantId

  useEffect(() => {
    if (initialData) {
      setFormData({
        categoryName: initialData.name,
        restaurantId: initialData.restaurantId || "",
      });
    }
  }, [initialData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      name: formData.categoryName,
      restaurantId: { id: 1 },
    };
    dispatch(createCategoryAction(reqData,token))
    .then((res) => {
      dispatch(getRestaurantsCategories({ token, restaurantId }));
    }
    )


    onClose();
  };

  useEffect(() => {
    

  },[dispatch, token, restaurantId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
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
        id="categoryName"
        name="categoryName"
        label="Category Name"
        variant="outlined"
        onChange={handleInputChange}
        value={formData.categoryName}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {initialData ? "Update Category" : "Create Category"}
      </Button>
    </form>
  );
};

export default CreateFoodCategory;
