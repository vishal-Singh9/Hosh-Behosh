import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageToCloudinary } from "../utils/Cloudinary";
import { createMenuItem, getMenuItems } from "../../State/Menu/Action";
import { getIngredients } from "../../State/Ingredients/Action";
import { useNavigate } from "react-router-dom";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive()
    .typeError("Price must be a valid number"),
  categoryId: Yup.string().required("Category is required"),
  ingredientIds: Yup.array()
    .of(Yup.number())
    .min(1, "Select at least one ingredient"),
  vegetarian: Yup.boolean().required("Vegetarian is required"),
  seasonal: Yup.boolean().required("Seasonal is required"),
  nonveg: Yup.boolean().required("Non-Veg is required"),
  images: Yup.array().of(Yup.string()),
});

const CreateMenuForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { restaurant, ingredients } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;

  // Fetch ingredients
  useEffect(() => {
    dispatch(getIngredients({ token, restaurantId }));
  }, [dispatch, token, restaurantId]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      ingredientIds: [],
      vegetarian: false,
      seasonal: false,
      nonveg: false,
      images: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        restaurantId,
      };
      dispatch(createMenuItem({ reqData: payload, token })).then(() => {
        dispatch(getMenuItems({ token, restaurantId }));
        navigate(`/admin/restaurants/menu`);
      });
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const { url } = await uploadImageToCloudinary(file);
        formik.setFieldValue("images", [...formik.values.images, url]);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = (index) => {
    formik.setFieldValue(
      "images",
      formik.values.images.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="py-10 flex items-center justify-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-white rounded-md shadow-lg w-full max-w-4xl"
      >
        <h1 className="font-bold text-2xl text-center py-4 mb-6">
          Add New Menu Item
        </h1>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              {...formik.getFieldProps("description")}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="categoryId">Category</InputLabel>
              <Select
                labelId="categoryId"
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                error={
                  formik.touched.categoryId && Boolean(formik.errors.categoryId)
                }
              >
                {restaurant?.categories?.length > 0 ? (
                  restaurant.categories.map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No categories available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Ingredients */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="ingredientIds">Ingredients</InputLabel>
              <Select
                name="ingredientIds"
                multiple
                value={formik.values.ingredientIds}
                onChange={(e) =>
                  formik.setFieldValue("ingredientIds", e.target.value || [])
                }
                error={
                  formik.touched.ingredientIds &&
                  Boolean(formik.errors.ingredientIds)
                }
              >
                {ingredients?.ingredients?.length > 0 ? (
                  ingredients.ingredients.map((item) => (
                    <MenuItem
                      key={item.ingredientsItemId}
                      value={item.ingredientsItemId}
                    >
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No ingredients available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              {...formik.getFieldProps("price")}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          {/* Checkboxes */}
          <Grid item xs={12}>
            {["vegetarian", "seasonal", "nonveg"].map((field) => (
              <FormControlLabel
                key={field}
                control={
                  <Checkbox
                    name={field}
                    checked={formik.values[field]}
                    onChange={formik.handleChange}
                  />
                }
                label={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <label htmlFor="fileInput">
              <span className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg hover:bg-gray-100">
                <AddPhotoAlternateIcon />
                {isUploading ? "Uploading..." : "Upload Images"}
              </span>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            <div className="flex gap-4 mt-4">
              {formik.values.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "white",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} className="text-center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateMenuForm;
