import React, { useState, useEffect, useRef } from "react";

const Carousel = () => {
  const images = [
    "/img/jams.jpg",
    "/img/knitting.jpg",
    "/img/pottery.jpg",
    "/img/soaps.jpg",
    "/img/wicker.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Empieza en 1, ya que clonamos el primer slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(3); // Default: 3 images visible for large screens
  const totalImages = images.length;
  const transitionDuration = 500; // Duración de la transición en ms
  const intervalRef = useRef(null);

  // Clonamos la última y la primera imagen para hacer el bucle infinito
  const clonedImages = [images[totalImages - 1], ...images, images[0]];

  // Detectar el tamaño de la pantalla y ajustar la cantidad de imágenes visibles
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleImages(3); // 3 imágenes para pantallas grandes
      } else if (window.innerWidth >= 780 && window.innerWidth < 1024) {
        setVisibleImages(2); // 2 imágenes para pantallas medianas
      } else {
        setVisibleImages(1); // 1 imagen para pantallas pequeñas
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ajuste inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cambiar automáticamente cada 3 segundos
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia cada 3 segundos
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Reseteo del carrusel para el bucle infinito sin transición visible
  useEffect(() => {
    if (currentIndex === clonedImages.length - 1) {
      // Si estamos en la última imagen clonada (que es el primer slide real)
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1); // Saltamos al primer slide real sin transición
      }, transitionDuration); // Duración de la transición antes de resetear
    }

    if (currentIndex === 0) {
      // Si estamos en el primer slide clonado (que es el último slide real)
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalImages); // Saltamos al último slide real sin transición
      }, transitionDuration);
    }
  }, [currentIndex, clonedImages.length, totalImages]);

  return (
    <div className="bg-[#00B207] bg-opacity-20 p-4 rounded-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-4">Productos Artesanales</h2>
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform ease-in-out duration-${transitionDuration}ms ${isTransitioning ? '' : 'duration-0'}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)` // Ajustamos para manejar el número de imágenes visibles (1, 2 o 3)
          }}
        >
          {clonedImages.map((image, index) => (
            <div
              key={index}
              className={`w-full ${visibleImages === 2 ? "md:w-1/2" : visibleImages === 3 ? "lg:w-1/3" : "w-full"} h-64 flex-shrink-0 px-2`}
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
    </div>
  );
};

export default Carousel;
