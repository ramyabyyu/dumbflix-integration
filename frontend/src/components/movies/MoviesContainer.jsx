import React from "react";
import { useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import dummyMovieImg from "../../assets/images/img2.webp";
import MovieList from "./MovieList";
import "../../assets/css/TvSeriesAndMovies.modules.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MoviesContainer = () => {
  const [movieLists, setMovieLists] = useState([
    {
      movieImg: dummyMovieImg,
      title: "Money Heist",
      year: 2022,
      type: "Movie",
    },
    {
      movieImg: dummyMovieImg,
      title: "Money Heist",
      year: 2022,
      type: "Movie",
    },
    {
      movieImg: dummyMovieImg,
      title: "Money Heist",
      year: 2022,
      type: "Movie",
    },
    {
      movieImg: dummyMovieImg,
      title: "Money Heist",
      year: 2022,
      type: "Movie",
    },
    {
      movieImg: dummyMovieImg,
      title: "Money Heist",
      year: 2022,
      type: "Movie",
    },
  ]);

  return (
    <Container className="my-5 overflow-hidden" id="movie">
      <h3 className="text-start text-white fw-bold mb-3">Movie</h3>
      <Row>
        {movieLists.map((movie, index) => (
          <Col md={2} key={index}>
            <MovieList
              movieImg={movie.movieImg}
              title={movie.title}
              year={movie.year}
            />
          </Col>
        ))}
        <Col md={2}>
          <Card className="rounded shadow border-0 bg-dark text-white d-flex justify-content-center align-items-center">
            <Link
              to="/movies"
              className="text-decoration-none text-white see__more-link"
            >
              <p>
                See More <FaArrowAltCircleRight />
              </p>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesContainer;
