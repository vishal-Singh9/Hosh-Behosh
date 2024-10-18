import { Card, Chip, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { addTofavorite } from "../State/Authentication/Action";
import { isPresentInFavorites } from "../components/config/logic";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { auth } = useSelector((store) => store);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const isOpen = restaurant?.open ?? false; // Adjust this based on your logic

  useEffect(() => {
    setIsFavorite(isPresentInFavorites(auth.favorites, restaurant));
  }, [auth.favorites, restaurant]);

  const handleAddToFavorite = (event) => {
    event.stopPropagation(); 
    dispatch(
      addTofavorite({
        restaurantId: restaurant.restaurantId,
        token,
        isFavorite,
      })
    );
    setIsFavorite((prev) => !prev);
  };

  const handleNavigateToRestaurant = () => {
    if (isOpen) { 
      navigate(`restaurant/${restaurant.address.city}/${restaurant.name}/${restaurant?.restaurantId}`);
    }
  };

  return (
    <Card
      onClick={handleNavigateToRestaurant}
      className="m-3 w-full max-w-[18rem] sm:max-w-[20rem] md:max-w-[22rem] shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <div className={`${isOpen ? "cursor-pointer" : "cursor-not-allowed"} relative`}>
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={restaurant?.images[0] || "default_image.jpg"}
          alt={restaurant?.name || "Restaurant"}
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={isOpen ? "success" : "error"}
          label={isOpen ? "Open" : "Closed"}
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="font-semibold cursor-pointer text-xl">{restaurant?.name || "Unknown Restaurant"}</p>
          <p className="text-gray-500 text-sm">{restaurant?.description || "No description available"}</p>
          <p className="text-sm">{restaurant?.cuisineType || "Cuisine type not available"}</p>
        </div>
        <IconButton onClick={handleAddToFavorite} className="mt-2">
          {isFavorite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        {console.log(restaurant)}
      </div>
    </Card>
  );
}

export default RestaurantCard;
