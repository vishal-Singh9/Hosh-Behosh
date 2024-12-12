import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurantsAction,
  getRestaurantById,
  getRestaurantsCategories,
} from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";
import "/Users/indianic/Desktop/Swimmy/styles/RestaurantDetails.css";
import { toast } from "react-toastify";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
  { label: "Seasonal", value: "seasonal" },
];

function RestaurantDetails() {
  const [foodType, setFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = (event) => {
    setFoodType(event.target.value);
  };

  const handleFilterCategory = (event, value) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setSelectedCategory(value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, menu } = useSelector((store) => store);
  console.log("menu", menu, "resatuarnt",restaurant);
  const { id } = useParams();
  const cleanedId = id?.replace(/[^\d]/g, ""); // Removes any non-numeric characters
  console.log("Cleaned ID:", cleanedId);
  
  const restaurantId = cleanedId
   


  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      return; // Exit the effect if no token
    }

    dispatch(getRestaurantById({ restaurantId, token }));
    dispatch(getAllRestaurantsAction())
      .then(() => {
        // Additional logic if needed after restaurants are fetched
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });

    dispatch(getRestaurantsCategories({ token, restaurantId }));
  }, [dispatch, restaurantId, token]);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: restaurantId,
        token,
        vegetarian: foodType === "veg",
        nonveg: foodType === "non-veg",
        seasonal: foodType === "seasonal",
        foodCategory: selectedCategory,
      })
    );
  }, [selectedCategory, foodType, restaurantId, token]);

  const images =
    restaurant?.restaurant?.images || [];

  return (
    <div className="px-5 lg:px-20 ">
      <section>
        <div>
          <Grid container spacing={2}>
            {images.slice(0, 3).map((image, index) => (
              <Grid item xs={12} lg={index === 0 ? 12 : 6} key={index}>
                <img
                  className="w-full h-[40vh] object-cover mt-5"
                  src={image}
                  alt={`Image ${index + 1} not found`}
                />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="pt-3 pb-5 ">
          <h1 className="text-4xl font-semibold">
            {restaurant?.restaurant?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {restaurant?.restaurant?.description}
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>
                {restaurant?.restaurant?.address?.street
                }
              </span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarMonthIcon />
              <span>
                {restaurant?.restaurant?.openingHours
}
              </span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter ">
          <div className="box space-y-5 lg:sticky top-28 ">
            <div>
              <Typography variant="h6" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component="fieldset">
                <RadioGroup
                  onChange={handleFilter}
                  name="foodType"
                  value={foodType}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <Divider />

            <div>
              <Typography variant="h6" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component="fieldset">
                <RadioGroup
                  onChange={handleFilterCategory}
                  name="foodCategory"
                  value={selectedCategory}
                >
                  {restaurant?.categories.map((item) => (
                  
                    <FormControlLabel
                      key={item.categoryId}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu?.menuItems?.map((item) => {
            return (
              <MenuCard
                key={item}
                item={item}
                restaurantId={item.restaurantId}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default RestaurantDetails;
