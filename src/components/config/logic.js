
export const isPresentInFavorites = (favorites, restaurant) => {
    if (!restaurant || !restaurant.restaurantId) {
      console.error("Restaurant or restaurantId is missing:", restaurant);
      return false; 
    }
  
    return favorites.some(
      (fav) => fav.restaurantId === restaurant.restaurantId
    );
  };
  