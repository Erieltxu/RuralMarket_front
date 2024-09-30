import React, { useState, useEffect, useRef } from "react";
import EntrepreneurCard from './EntrepreneurCard';  
import useApi from '../../services/useApi';  
import { USERS } from '../../config/urls';  

const EntrepreneurCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);  // Iniciamos el índice en 0
  const [isTransitioning, setIsTransitioning] = useState(true);  // Controla si la transición está activada
  const [visibleImages, setVisibleImages] = useState(4);  // Número de imágenes visibles basado en la pantalla
  const transitionDuration = 500;  // Duración de la transición
  const intervalRef = useRef(null);

  const { data: users, loading, error } = useApi({
    apiEndpoint: USERS,
    method: 'GET'
  });

  const entrepreneurs = users ? users.filter(user => user.user_type === 'seller') : [];
  const totalImages = entrepreneurs.length;

  // Clonamos las imágenes al principio y al final del array para crear el ciclo continuo
  const extendedEntrepreneurs = [...entrepreneurs, ...entrepreneurs];

  // Manejamos el número de imágenes visibles basado en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setVisibleImages(4);  
      } else if (window.innerWidth >= 590 && window.innerWidth < 900) {
        setVisibleImages(3);  
      } else if (window.innerWidth >= 390 && window.innerWidth < 590) {
        setVisibleImages(2);  
      } else {
        setVisibleImages(1);  
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();  // Llamamos la función inmediatamente para ajustar según la ventana actual

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
    }, 3000);  // Avanza cada 4 segundos
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
      }, 0); // Esperamos a que la transición termine antes de ajustar el índice
    }

    // Reactivamos la transición después de ajustar el índice
    if (currentIndex === 0 || currentIndex !== totalImages) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);  // Reactivamos la transición tras un pequeño retraso
    }

  }, [currentIndex, totalImages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">Nuestras Emprendedoras Rurales</h2>
      <div className="relative w-full overflow-hidden">
        {loading && <p>Cargando emprendedoras...</p>}
        {error && <p>Error: {error}</p>}
        
        <div
          className={`flex transition-transform ease-in-out ${isTransitioning ? `duration-${transitionDuration}ms` : 'duration-0'}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
            gap: '1rem',  // Espacio entre las tarjetas
          }}
        >
          {extendedEntrepreneurs.map((entrepreneur, index) => (
            <div
              key={index}
              className={`w-[${100 / visibleImages}%] h-auto flex-shrink-0 p-3`}  // Padding entre las tarjetas
            >
              <EntrepreneurCard
                name={entrepreneur.first_name}  
                image={entrepreneur.photo}  
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

export default EntrepreneurCarousel;
