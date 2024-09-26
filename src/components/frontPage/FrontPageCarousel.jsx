import React from "react";

const FrontPageCarousel = () => {
  const images = [
    "/img/home1.png",
    "/img/home2.png",
    "/img/home3.png",
    "/img/home4.png",
    "/img/jams.jpg"
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
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-120"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontPageCarousel;
