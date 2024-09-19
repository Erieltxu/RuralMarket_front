import React from "react";
import Carousel from "./components/Carousel"; 

const Home = () => {
  return (
    <div className="home-page">
      <h2 className="text-3xl font-bold text-center mb-4">Productos Artesanos</h2>
      <Carousel />
    </div>
  );
};

export default Home;
