import React, { useEffect } from "react";
import "./HomePage.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RestaurantCard from "../../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";

function HomePage({token}) {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);

  

  useEffect(() => {
    dispatch(getAllRestaurantsAction(token));
  }, [dispatch]);
  return (
    <div>
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-7xl font-bold z-10 py-5 text-white">
            Hosh BeHosh
          </p>
          <p className="text-xl lg:text-4xl font-bold z-10 text-white">
            Taste the Convenience: FOOd ,Fast and Delivered.
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeout"></div>
      </section>
      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
          Top Meals
        </p>
        <MultiItemCarousel />
      </section>
      <section className="px-3 lg:px-20 pt-10">
        <h1 className="text-2xl font-semibold text-gray-400 py-3">
          Order From Our HandPicked Favourites
        </h1>
        <div className="flex flex-wrap items-center justify-center  gap-4">
          {restaurant?.restaurants?.map((restaurant) => {
            return (
              <RestaurantCard
                key={restaurant.restaurantId}
                restaurant={restaurant}
              />
              
            );
            
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
