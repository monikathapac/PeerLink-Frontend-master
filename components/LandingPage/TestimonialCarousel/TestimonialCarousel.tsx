import TestimonialCard from "components/Cards/TestimonialCards";
import Carousel from "components/Carousel/Carousel";
import React from "react";
import testimonialData from "utils/TestimonialData";

const TestimonialCarousel = () => {
  const carouselItems = testimonialData.map((d, i) => (
    <TestimonialCard
      key={i}
      rating={5}
      quote={d.quote}
      authorName={d.authorName}
      authorImage={d.authorImage}
      authorRole={d.authorRole}
    />
  ));
  const customResponsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
    // Add more responsive settings as needed
  ];
  return (
    <div className="bg-gray-100 py-12 text-center">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        More than 3000 Customer Trust Us!
      </h1>
      <p className="text-black text-lg mb-2">
        They rated us 4.8/5 on Google and Trustpilot
      </p>
      <div className="px-12">
        <Carousel
          items={carouselItems}
          slidesToShow={2}
          autoplaySpeed={3000}
          responsive={customResponsive}
        />
      </div>
    </div>
  );
};

export default TestimonialCarousel;
