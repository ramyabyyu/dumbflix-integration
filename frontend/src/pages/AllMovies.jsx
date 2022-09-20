import React, { useState } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { Card, Col, Container, Row } from "react-bootstrap";
import MovieList from "../components/movies/MovieList";

const AllMovies = () => {
  const [movieLists, setMovieLists] = useState([]);

  const fetchAllMovies = async () => {
    try {
      const response = await API.get("/films");
      if (response.status === 200) {
        console.log(response);
        setMovieLists(response.data.data);
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useQuery("films", fetchAllMovies);

  return (
    <Container className="my-5 overflow-hidden">
      <h3 className="text-start text-white fw-bold mb-3">All Movies</h3>
      <Row>
        {movieLists.map((m) => (
          <Col md={2} key={m.id}>
            <MovieList
              movieImg={m.thumbnail_film}
              title={m.title}
              year={m.year}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllMovies;
