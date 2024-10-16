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
  getRestaurantById,
  getRestaurantsCategories,
} from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

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
    
    console.log("food", event.target.value);
  };

  const handleFilterCategory = (event,value) => {
    const selectedCategory = event.target.value;  
    setSelectedCategory(selectedCategory);
    setSelectedCategory(value);
    console.log("Selected Category:", selectedCategory);  
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, menu } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRestaurantById(id, token));
    dispatch(getRestaurantsCategories(id, token));
  }, [dispatch, id, token]);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: id,
        token,
        vegetarian: foodType === "veg",
        nonveg: foodType === "non-veg",
        seasonal: foodType === "seasonal",
        foodCategory: selectedCategory,
      })
    );
  }, [selectedCategory,foodType,id ,token]);
  return (
    <div className="px-5 lg:px-20 ">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/India/Indian fast food/3
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant?.restaurant?.images}
                alt=""
              />
            </Grid>
            <Grid item lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant?.restaurant?.images}
                alt=""
              />
            </Grid>
            <Grid item lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant?.restaurant?.images}
                alt=""
              />
            </Grid>
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
              <span>{restaurant?.restaurant?.address.street}</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarMonthIcon />
              <span>9:00 AM - 9:00 PM (Mon-Sun)</span>
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
            return <MenuCard key={item} item={item} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default RestaurantDetails;
