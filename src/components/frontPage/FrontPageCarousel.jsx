import React, { useState } from 'react';

const FrontPageCarousel = () => {
  const images = [
    "/img/home2.png",
    "/img/home3.png",
    "/img/home4.png"
  ];

  const imagesPerPage = 3; // Controla cuántas imágenes mostrar a la vez
  const totalImages = images.length;
  const [currentPage, setCurrentPage] = useState(0);

  // Función para ir a la siguiente página de imágenes
  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(totalImages / imagesPerPage));
  };

  // Función para ir a la página anterior de imágenes
  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(totalImages / imagesPerPage)) % Math.ceil(totalImages / imagesPerPage));
  };

  // Calculamos el índice de las imágenes que se mostrarán en la página actual
  const startIndex = currentPage * imagesPerPage;
  const displayedImages = images.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div className="relative max-w-4xl mx-auto overflow-hidden w-full">
      <div className="flex justify-center space-x-4">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className="w-1/3 px-2 h-[300px] md:h-[350px] lg:h-[350px] relative group"
          >
            <div className="relative overflow-hidden h-full rounded-lg border-2 border-transparent group-hover:border-green-500 transition-all duration-300 rounded-[15px]">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controles para navegar */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FrontPageCarousel;
