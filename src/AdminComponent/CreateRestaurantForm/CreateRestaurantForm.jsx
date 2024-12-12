import React from "react";
import { Grid, TextField, Button, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { createRestaurant, getRestaurantByUserId } from "../../State/Restaurant/Action";
import { uploadImageToCloudinary } from "../utils/Cloudinary";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  address: {
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  },
  contactInformation: {
    email: "",
    mobile: "",
    twitter: "",
    instagram: "",
  },
  openingHours: "",

  images: [],
};

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cuisineType: Yup.string().required("Cuisine Type is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  street: Yup.string().required("Street is required"),
  pinCode: Yup.string().required("Pin Code is required"),
  country: Yup.string().required("Country is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),
  twitter: Yup.string(),
  instagram: Yup.string(),
  openingHours: Yup.string(),
  images: Yup.array().of(Yup.string()),
});

const CreateRestaurantForm = () => {
  const [uploadedImages, setUploadedImages] = React.useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues,

    validationSchema,
    onSubmit: (values,{resetForm}) => {
      
      const reqData = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          pinCode: values.pinCode,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };
      dispatch(createRestaurant({ reqData, token }))
      .then(() => {
        dispatch(getRestaurantByUserId(token))
      })
      resetForm({});
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadedImages(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image.url]);
    setUploadedImages(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="py-10 flex items-center justify-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-white rounded-md shadow-lg w-full max-w-4xl"
      >
        <h1 className="font-bold text-2xl text-center py-4 mb-6">
          Add New Restaurant
        </h1>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>

          {/* Cuisine Type */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cuisine Type"
              name="cuisineType"
              value={formik.values.cuisineType}
              onChange={formik.handleChange}
              error={
                formik.touched.cuisineType && Boolean(formik.errors.cuisineType)
              }
              helperText={
                formik.touched.cuisineType && formik.errors.cuisineType
              }
            />
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Street"
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>
          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>

          {/* Pin Code */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pin Code"
              name="pinCode"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid>

          {/* Country */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          {/* Mobile */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>

          {/* Twitter */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Twitter"
              name="twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Instagram */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Instagram"
              name="instagram"
              value={formik.values.instagram}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Opening Hours"
              name="openingHours"
              value={formik.values.openingHours}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <label htmlFor="fileInput">
              <span className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg hover:bg-gray-100">
                <AddPhotoAlternateIcon />
                Upload Images
              </span>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            <div className="flex gap-4 mt-4">
              {formik.values.images.map(
                (image, index) => (
                  (
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
                  )
                )
              )}
            </div>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateRestaurantForm;
