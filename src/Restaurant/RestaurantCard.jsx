import { Card, Chip, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { addTofavorite } from "../State/Authentication/Action";
import { isPresentInFavorites } from "../components/config/logic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { auth } = useSelector((store) => store);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(restaurant?.open ?? false);


  useEffect(() => {
    setIsFavorite(isPresentInFavorites(auth.favorites, restaurant));
  }, [auth.favorites, restaurant]);

  useEffect(() => {
    setIsOpen(restaurant?.open ?? false);
  }, [restaurant]);
  
  const handleAddToFavorite = (event) => {
    event.stopPropagation();
    
    dispatch(addTofavorite({ restaurantId: restaurant.restaurantId, token, isFavorite }));
    setIsFavorite((prev) => !prev);
  
  };

  const handleNavigateToRestaurant = () => {
    if (isOpen) {
      navigate(`restaurant/${restaurant?.address?.city}/${restaurant.name}/${restaurant?.restaurantId}`);
    } else {
      toast.warning("This restaurant is currently closed.");
    }
  };

  return (
    <Card
      onClick={handleNavigateToRestaurant}
      className="m-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <div className={`${isOpen ? "cursor-pointer" : "cursor-not-allowed"} relative`}>
        <img
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 restaurant-card-image rounded-t-md object-cover"
          src={restaurant?.images[0] || "default_image.jpg"}
          alt={restaurant?.name || "Restaurant"}
        />
        <Chip
          size="small"
          className="absolute top-2 left-2 text-xs sm:text-sm"
          color={isOpen ? "success" : "error"}
          label={isOpen ? "Open" : "Closed"}
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div className="space-y-1">
          <IconButton onClick={handleAddToFavorite} className="right-0 top-0">
            {isFavorite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
          </IconButton>
          <p className="font-semibold text-lg sm:text-xl cursor-pointer">{restaurant?.name || "Unknown Restaurant"}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{restaurant?.description || "No description available"}</p>
          <p className="text-xs sm:text-sm">{restaurant?.cuisineType || "Cuisine type not available"}</p>
        </div>
      </div>
    </Card>
  );
}

export default RestaurantCard;
