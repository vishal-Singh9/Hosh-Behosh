export const isPresentInFavorites = (favorites, restaurant) => {
  // Ensure favorites is a valid array
  if (!Array.isArray(favorites)) {
    console.error("Invalid favorites array:", favorites);
    return false;
  }

  const restaurantId = restaurant?.restaurantId;

  if (!restaurantId) {
    console.error("Invalid restaurant object:", restaurant);
    return false;
  }

  return favorites.some((fav) => fav.restaurantId === restaurantId);
};
