import React from "react";
import Carousel from "../components/Carousel";
import EntrepreneurCarousel from "../components/EntrepreneurCarousel"

const Home = () => {
  return (
    <div className="home-page">
      <EntrepreneurCarousel />
      <Carousel />
    </div>
  );
};

export default Home;
