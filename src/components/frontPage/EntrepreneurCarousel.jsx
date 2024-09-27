import React, { useState, useEffect, useRef } from "react";
import EntrepreneurCard from './EntrepreneurCard';  
import { USERS } from '../../config/urls';  

const EntrepreneurCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);  
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(4);
  const transitionDuration = 500;  
  const intervalRef = useRef(null);


  const { data: users, loading, error } = useApi({
    apiEndpoint: USERS,
    method: 'GET'
  });


  const entrepreneurs = users ? users.filter(user => user.user_type === 'seller') : [];
  const totalImages = entrepreneurs.length;

  const clonedEntrepreneurs = totalImages ? [entrepreneurs[totalImages - 1], ...entrepreneurs, entrepreneurs[0]] : [];


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
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
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


  useEffect(() => {
    if (currentIndex === clonedEntrepreneurs.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1); 
      }, transitionDuration);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalImages);  
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
              className={`w-[${100 / visibleImages}%] h-auto flex-shrink-0 px-2 rounded-lg overflow-hidden`}  
            >
              <EntrepreneurCard
                name={entrepreneur.username} 
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
