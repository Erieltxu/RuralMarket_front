import React, { useState, useEffect, useRef } from "react";

const Carousel = () => {
  const images = [
    "/img/vallicuerra1.png",
    "/img/vallicuerra2.png",
    "/img/Shiit2.png",
    "/img/Shiit1.png",
    "/img/ringo2.png",
    "/img/acougo1.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(3); 
  const totalImages = images.length;
  const transitionDuration = 500; 
  const intervalRef = useRef(null);

  const clonedImages = [images[totalImages - 1], ...images, images[0]];

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
    }, 3000); 
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
    if (currentIndex === clonedImages.length - 1) {
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
  }, [currentIndex, clonedImages.length, totalImages]);

  return (
    <div className="bg-[#00B207] bg-opacity-20 p-4 rounded-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-4">Productos y Servicios</h2>
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform ease-in-out duration-${transitionDuration}ms ${isTransitioning ? '' : 'duration-0'}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)` 
          }}
        >
          {clonedImages.map((image, index) => (
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
