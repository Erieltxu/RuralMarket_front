import React, { useState, useEffect, useRef } from "react";
import EntrepreneurCard from './EntrepreneurCard';  // Componente de tarjeta de emprendedora
import useApi from '../../services/useApi';  // Hook personalizado para la API
import { USERS } from '../../config/urls';  // URL de la API

const EntrepreneurCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);  // Comenzar en el índice 1
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(4);  // Mostrar 4 imágenes por defecto
  const transitionDuration = 500;  // Duración de la transición en milisegundos
  const intervalRef = useRef(null);

  // Llamada a la API para obtener la lista de usuarios
  const { data: users, loading, error } = useApi({
    apiEndpoint: USERS,
    method: 'GET'
  });

  // Filtrar los usuarios que tienen el tipo 'seller' (emprendedoras)
  const entrepreneurs = users ? users.filter(user => user.user_type === 'seller') : [];
  const totalImages = entrepreneurs.length;

  // Clonamos la primera y última emprendedora para hacer el efecto de carrusel infinito
  const clonedEntrepreneurs = totalImages ? [entrepreneurs[totalImages - 1], ...entrepreneurs, entrepreneurs[0]] : [];

  // Ajustar la cantidad de imágenes visibles según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setVisibleImages(4);  // 4 imágenes para pantallas grandes
      } else if (window.innerWidth >= 590 && window.innerWidth < 900) {
        setVisibleImages(3);  // 3 imágenes para pantallas medianas
      } else if (window.innerWidth >= 390 && window.innerWidth < 590) {
        setVisibleImages(2);  // 2 imágenes para pantallas más pequeñas
      } else {
        setVisibleImages(1);  // 1 imagen para pantallas muy pequeñas
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();  // Ajuste inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Comenzar el carrusel automático
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);  // Cambia cada 4 segundos
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

  // Reseteo del carrusel para el efecto infinito sin transición visible
  useEffect(() => {
    if (currentIndex === clonedEntrepreneurs.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);  // Saltamos al primer slide real sin transición
      }, transitionDuration);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalImages);  // Saltamos al último slide real sin transición
      }, transitionDuration);
    }
  }, [currentIndex, clonedEntrepreneurs.length, totalImages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">Nuestras Emprendedoras Rurales</h2>
      <div className="relative w-full overflow-hidden">
        {loading && <p>Cargando emprendedoras...</p>}
        {error && <p>Error: {error}</p>}
        
        <div
          className={`flex transition-transform ease-in-out ${isTransitioning ? 'duration-500' : 'duration-0'}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`
          }}
        >
          {clonedEntrepreneurs.map((entrepreneur, index) => (
            <div
              key={index}
              className={`w-[${100 / visibleImages}%] h-auto flex-shrink-0 px-2 rounded-lg overflow-hidden`}  // Ajuste dinámico para las imágenes visibles con borde y margen
            >
              <EntrepreneurCard
                name={entrepreneur.username}  // Mostrar el nombre del emprendedor
                image={entrepreneur.photo}  // Mostrar la imagen del emprendedor (debe ser una URL válida)
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
