import React from "react";
import theWitcherImg from "../assets/images/the_witcher.png";
import theWitcher1 from "../assets/images/thewitcher1.png";
import "../assets/css/Jumbotron.modules.css";

const Jumbotron = () => {
  return (
    <div className="position-relative overflow-hidden jumbotron__box-shadow">
      <img src={theWitcherImg} alt="the witcher" className="jumbotron__img" />
      <div className="cool__box-shadow"></div>
      <div className="position-absolute d-flex flex-column jumbotron__text">
        <img src={theWitcher1} alt="the witcher 1" />
        <p className="text-white fs-3 m-0">
          Geralt of Rivia, a solitary monster hunter, struggles to find his
          place in
        </p>
        <p className="text-white fs-3 m-0">
          a world where people often prove more wicked than beast
        </p>
        <div className="d-flex my-3 align-items-center">
          <p className="text-white fs-5 me-3 my-0">2019</p>
          <span className="border border-white rounded text-white px-2 py-1">
            Tv Series
          </span>
        </div>
        <div>
          <button className="btn btn-danger text-uppercase lh-base">
            Watch Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
