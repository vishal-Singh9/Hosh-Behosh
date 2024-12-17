import React, { useEffect } from "react";
import "./HomePage.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RestaurantCard from "../../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";
import { toast } from "react-toastify";

function HomePage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector((store) => store);
// const restaurantId =restaurant?.restaurants?.restaurantId
  useEffect(() => {
    dispatch(getAllRestaurantsAction())

  }, [dispatch]);
  return (
    <div>
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-7xl font-bold z-10 py-5 text-white">
            Hosh BeHosh
          </p>
          <p className="text-xl lg:text-4xl font-bold z-10 text-white">
            Taste the Convenience: fOOd ,Fast and Delivered.
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
      


          {restaurant?.restaurants?.length > 0 &&
          restaurant?.restaurants?.map((res,index) => {
            return (
              <RestaurantCard
                key={index}
                restaurant={res}
              />
              
            );
            
          })}
        </div>
      </section>
      <section className="cta bg-gradient-to-r from-green-400 to-green-600 py-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Hungry? Order Now and Get Your Food Delivered Fast!
        </h3>
        <button className="px-6 py-3 text-lg font-semibold text-green-600 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
          Explore Restaurants
        </button>
      </section>
    </div>
  );
}

export default HomePage;
