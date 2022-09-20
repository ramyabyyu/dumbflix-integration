import React from "react";
import Jumbotron from "../components/Jumbotron";
import MoviesContainer from "../components/movies/MoviesContainer";
import TvSeriesContainer from "../components/tvSeries/TvSeriesContainer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Home = () => {
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user?.data || isSuccess) {
      toast.success(`Welcome ${user?.data?.full_name}`);
    }
  }, [user, isError, isSuccess, message]);

  return (
    <div>
      <Jumbotron />
      <TvSeriesContainer />
      <MoviesContainer />
    </div>
  );
};

export default Home;
