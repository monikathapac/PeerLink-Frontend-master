import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  items: React.ReactNode[];
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  responsive?: Settings["responsive"];
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  slidesToShow = 6,
  slidesToScroll = 1,
  autoplay = true,
  autoplaySpeed = 3000,
  responsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        dots: false,
        arrows: false,
      },
    },
  ],
}) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    autoplay,
    autoplaySpeed,
    responsive,
  };

  return (
    <Slider {...settings} className="pb-5">
      {items}
    </Slider>
  );
};

export default Carousel;
