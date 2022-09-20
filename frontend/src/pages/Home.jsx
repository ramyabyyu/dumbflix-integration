import React from "react";
import Jumbotron from "../components/Jumbotron";
import MoviesContainer from "../components/movies/MoviesContainer";
import TvSeriesContainer from "../components/tvSeries/TvSeriesContainer";

const Home = () => {
  return (
    <div>
      <Jumbotron />
      <TvSeriesContainer />
      <MoviesContainer />
    </div>
  );
};

export default Home;
