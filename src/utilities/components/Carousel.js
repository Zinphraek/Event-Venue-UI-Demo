import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  });

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="relative max-w-xl mx-auto overflow-hidden rounded">
      <div className="absolute inset-y-0 left-0 flex items-center z-10">
        <button
          className="bg-gray-500 bg-opacity-40 text-white p-4 rounded-r-full hover:bg-opacity-60"
          onClick={prevSlide}
        >
          &#10094;
        </button>
      </div>
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full rounded">
            <img
              src={image}
              alt="carousel"
              className="w-full rounded h-[225px] md:h-[300px] lg:h-[350px]"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-10">
        <button
          className="bg-gray-500 bg-opacity-40 text-white p-4 rounded-l-full hover:bg-opacity-60"
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
