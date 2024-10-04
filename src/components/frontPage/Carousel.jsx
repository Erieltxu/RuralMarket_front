import React, { useState, useEffect, useRef } from "react";

const Carousel = () => {
  const images = [
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",

    
  ];

  // Creamos un estado que maneja el índice actual de la imagen
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalImages = images.length;
  const intervalRef = useRef(null);
  const transitionDuration = 500; // Duración de la transición (500ms)

  // Para manejo de imágenes visibles por tamaño de ventana
  const [visibleImages, setVisibleImages] = useState(3);

  // Clonamos las imágenes al final del array para que sea un ciclo continuo
  const extendedImages = [...images, ...images];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleImages(3);
      } else if (window.innerWidth >= 780 && window.innerWidth < 1024) {
        setVisibleImages(2);
      } else {
        setVisibleImages(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ajuste inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // Función para iniciar el slide automático
  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);  // Avanza cada 3 segundos
  };

  // Detiene el auto-slide
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Este efecto maneja el ciclo continuo cuando llegamos al final de las imágenes duplicadas
  useEffect(() => {
    if (currentIndex === totalImages) {
      // Desactivamos la transición antes de mover al inicio para evitar el efecto de desplazamiento
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(0);  // Reiniciamos el índice
      }, 0);  // Ajustamos el índice instantáneamente
    }

    // Reactivamos la transición después de ajustar el índice
    if (currentIndex === 0 || currentIndex !== totalImages) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);  // Reactivamos la transición tras un pequeño retraso
    }

  }, [currentIndex, totalImages]);

  return (
    <div className="bg-[#00B207] bg-opacity-20 p-4 rounded-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-4">Productos y Servicios</h2>
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform ease-in-out ${isTransitioning ? `duration-${transitionDuration}ms` : 'duration-0'}`}
          style={{
            transform: `translateX(-${(currentIndex * (100 / visibleImages))}%)`
          }}
        >
          {extendedImages.map((image, index) => (
            <div
              key={index}
              className={`w-full ${visibleImages === 2 ? "md:w-1/2" : visibleImages === 3 ? "lg:w-1/3" : "w-full"} h-80 flex-shrink-0 px-2`}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

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
