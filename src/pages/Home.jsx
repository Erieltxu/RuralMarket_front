import React from "react";
import Carousel from "../components/frontPage/Carousel";
import FrontPagePhoto from "../components/frontPage/FrontPagePhoto"
import EntrepreneurCarousel from "../components/frontPage/EntrepreneurCarousel"

const Home = () => {
  return (
    <>
    <div>
     <EntrepreneurCarousel />
      <FrontPagePhoto></FrontPagePhoto>
      </div>
    <div className="home-page">
    <Carousel />
    </div>
    </>
  );
};
export default Home;
