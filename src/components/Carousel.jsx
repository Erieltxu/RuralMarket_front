import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "/img/jams.jpg",  
    "/img/knitting.jpg", 
    "/img/pottery.jpg",
    "/img/soaps.jpg",
    "/img/wicker.jpg",    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambia automáticamente de imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [currentIndex, images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)` // Ajustamos el translateX para cada imagen
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-64 flex-shrink-0 px-2" // px-2 añade un pequeño padding horizontal (gap)
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
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

export default Carousel;