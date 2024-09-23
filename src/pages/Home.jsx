import React from "react";
import Carousel from "../components/frontPage/Carousel";
import FrontPagePhoto from "../components/frontPage/FrontPagePhoto"
import EntrepreneurCarousel from "../components/frontPage/EntrepreneurCarousel"

const Home = () => {
  return (
    <>
    <div>
      <FrontPagePhoto></FrontPagePhoto>
      </div>
    <div className="home-page">
      <EntrepreneurCarousel />
      <Carousel />
    </div>
    </>
  );
};

export default Home;
