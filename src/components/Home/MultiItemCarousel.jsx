import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeals } from "./TopMeal";
import CarouselItem from "./CarouselItem";

function MultiItemCarousel() {
    const settings = {
        dots: true,infinite:true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll:5,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:false
    }
  return (
    <div>
      <Slider {...settings}>
        {topMeals.map((item) => (
          <CarouselItem key={item.title} image={item.image}  title={item.title} />
        ))}
      </Slider>
    </div>
  );
}

export default MultiItemCarousel;



