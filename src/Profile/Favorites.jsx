import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
  const {auth,restaurant} = useSelector((store) => store);

  return (
    <div className="py-5 px-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
         
        {auth.favorites.map((restaurant) => (
          <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
