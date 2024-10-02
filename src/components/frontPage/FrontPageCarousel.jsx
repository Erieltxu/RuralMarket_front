import React from "react";

const FrontPageCarousel = () => {
  const images = [
    "/img/9.jpg",
    "/img/8.jpg",
    "/img/7.jpg",
  ];

  const imagesPerPage = 3;

  return (
    <div className="relative max-w-4xl mx-auto overflow-hidden w-full">
      {/* Contenedor del carrusel */}
      <div className="flex justify-center space-x-4">
        {images.slice(0, imagesPerPage).map((image, index) => (
          <div
            key={index}
            className="w-1/3 px-2 h-[300px] md:h-[350px] lg:h-[350px] relative group"
          >
            <div className="relative overflow-hidden h-full border-2 border-transparent group-hover:border-green-500 transition-all duration-300 rounded-[15px]">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontPageCarousel;
