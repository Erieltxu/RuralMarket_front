
import React, { useState } from "react";

const FrontPageCarousel = () => {
    const images = [
        "/img/home1.png",
        "/img/home2.png",
        "/img/home3.png",
        "/img/home4.png",
        "/img/jams.jpg"
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
      const imagesPerPage = 3; 
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - imagesPerPage : prevIndex - 1
        );
      };

      const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= images.length - imagesPerPage ? 0 : prevIndex + 1
        );
      };
    
      return (
        <div className="relative max-w-4xl mx-auto overflow-hidden w-full">
      {/* Contenedor del carrusel */}
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-1/3 flex-shrink-0 px-2 h-[450px] md:h-[400px] lg:h-[350px]"
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
      );
    };
    
    export default FrontPageCarousel;