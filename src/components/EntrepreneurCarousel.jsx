import React, { useState, useEffect, useRef } from "react";
import EntrepreneurCard from './EntrepreneurCard'; 

const EntrepreneurCarousel = () => {
  const entrepreneurs = [
    {
      name: "Lorena",
      description: "Security Guard",
      image: "/img/Lorena.png"
    },
    {
      name: "Ana",
      description: "Senior Farmer Manager",
      image: "/img/Ana.png"
    },
    {
      name: "Belén",
      description: "Worker",
      image: "/img/Belén.png"
    },
    {
      name: "María",
      description: "CEO & Founder",
      image: "/img/María.png"
    },
    {
        name: "Teresa",
        description: "Farmer",
        image: "/img/Teresa.png"
      },
      {
        name: "Sarai",
        description: "Farmer",
        image: "/img/Sarai.png"
      },
      {
        name: "Marta",
        description: "Farmer",
        image: "/img/Marta.png"
      }
  ];

  const [currentIndex, setCurrentIndex] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(4); 
  const totalImages = entrepreneurs.length;
  const transitionDuration = 500; 
  const intervalRef = useRef(null);

  // Clonamos la última y la primera imagen para hacer el bucle infinito
  const clonedEntrepreneurs = [entrepreneurs[totalImages - 1], ...entrepreneurs, entrepreneurs[0]];

  // Detectar el tamaño de la pantalla y ajustar la cantidad de imágenes visibles
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleImages(4); // 4 imágenes para pantallas grandes
      } else if (window.innerWidth >= 780 && window.innerWidth < 1023) {
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
    }, 4000); // Cambia cada 3 segundos
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
    if (currentIndex === clonedEntrepreneurs.length - 1) {
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
  }, [currentIndex, clonedEntrepreneurs.length, totalImages]);

  return (
    <div className="p-4 rounded-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-4">Nuestras Emprendedoras Rurales</h2>
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform ease-in-out duration-${transitionDuration}ms ${isTransitioning ? '' : 'duration-0'}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)` // Ajustamos para manejar el número de imágenes visibles (1, 2 o 4)
          }}
        >
          {clonedEntrepreneurs.map((entrepreneur, index) => (
            <div
              key={index}
              className="w-[25%] md:w-[50%] lg:w-[25%] h-auto flex-shrink-0 px-2" // Ancho ajustado para 4 imágenes en pantallas grandes
            >
              {/* Llamamos al componente de las cards */}
              <EntrepreneurCard
                name={entrepreneur.name}
                description={entrepreneur.description}
                image={entrepreneur.image}
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

export default EntrepreneurCarousel;