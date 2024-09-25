import React, { useState, useEffect, useRef } from "react";
import EntrepreneurCard from './EntrepreneurCard';  // Asegúrate de que este componente esté definido correctamente
import useApi from '../../services/useApi';  // Tu hook personalizado
import { USERS } from '../../config/urls';  // URL correcta de la API

const EntrepreneurCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);  // Comenzar en el índice 1
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(4);  // Mostrar 4 imágenes por defecto
  const transitionDuration = 500;  // Duración de la transición en milisegundos
  const intervalRef = useRef(null);

  // Llamada a la API para obtener la lista de usuarios
  const { data: users, loading, error } = useApi({
    apiEndpoint: USERS,  // URL que debes verificar en el backend
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
      if (window.innerWidth >= 1024) {
        setVisibleImages(4);  // 4 imágenes para pantallas grandes
      } else if (window.innerWidth >= 780 && window.innerWidth < 1024) {
        setVisibleImages(2);  // 2 imágenes para pantallas medianas
      } else {
        setVisibleImages(1);  // 1 imagen para pantallas pequeñas
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
    <div className="p-4 rounded-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-4">Nuestras Emprendedoras Rurales</h2>
      <div className="relative w-full overflow-hidden">
        {loading && <p>Cargando emprendedoras...</p>}
        {error && <p>Error: {error}</p>}
        
        <div
          className={`flex transition-transform ease-in-out duration-${transitionDuration}ms ${isTransitioning ? '' : 'duration-0'}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`
          }}
        >
          {clonedEntrepreneurs.map((entrepreneur, index) => (
            <div
              key={index}
              className="w-[25%] md:w-[50%] lg:w-[25%] h-auto flex-shrink-0 px-2"
            >
              <EntrepreneurCard
                name={entrepreneur.username}  // Asegúrate de que el campo 'username' esté en la respuesta
                image={entrepreneur.photo}  // Asegúrate de que 'photo' esté presente y sea una URL válida
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
