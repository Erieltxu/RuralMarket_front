import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EntrepreneurCard from "./EntrepreneurCard";
import useApi from "../../services/useApi";
import { USERS } from "../../config/urls";

const EntrepreneurCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(4);
  const transitionDuration = 500;
  const intervalRef = useRef(null);

  const {
    data: users,
    loading,
    error,
  } = useApi({
    apiEndpoint: USERS,
    method: "GET",
  });

  const entrepreneurs = users
    ? users.filter((user) => user.user_type === "seller")
    : [];
  const totalImages = entrepreneurs.length;

  const extendedEntrepreneurs = [...entrepreneurs, ...entrepreneurs];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setVisibleImages(4);
      } else if (window.innerWidth >= 691 && window.innerWidth < 1000) {
        setVisibleImages(3);
      } else if (window.innerWidth >= 500 && window.innerWidth < 690) {
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
  }, []);

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
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (currentIndex === totalImages) {
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(0);
      }, 0);
    }

    if (currentIndex === 0 || currentIndex !== totalImages) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [currentIndex, totalImages]);

  return (
    <div className="p-9 rounded-lg w-full -mt-4">
      <Link to="/nuestrasemprendedoras">
        <h2 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Nuestras Emprendedoras Rurales
        </h2>
      </Link>
      <div className="relative w-full overflow-hidden">
        {loading && <p>Cargando emprendedoras...</p>}
        {error && <p>Error: {error}</p>}

        <div
          className={`flex transition-transform ease-in-out ${
            isTransitioning ? `duration-${transitionDuration}ms` : "duration-0"
          }`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
            gap: "1rem",
          }}
        >
          {extendedEntrepreneurs.map((entrepreneur, index) => (
            <div
              key={index}
              style={{ width: `${100 / visibleImages}%` }}
              className="h-auto p-3 flex-shrink-0"
            >
              <Link to={`/nuestrasemprendedoras/${entrepreneur.id}`}>
                <EntrepreneurCard
                  name={entrepreneur.first_name}
                  image={entrepreneur.photo}
                />
              </Link>
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
