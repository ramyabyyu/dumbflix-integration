import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFilms, reset } from "../features/film/filmSlice";

const AllMovies = () => {
  const { films, isSuccess, isError, message } = useSelector(
    (state) => state.film
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("films = ", films);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getFilms());

    return () => {
      dispatch(reset());
    };
  }, [isError, navigate, dispatch, message]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-3">
        {films.length < 1 ? (
          <Col md={12}>
            <Card className="rounded shadow border-0 bg-dark text-white p-5">
              <h3 className="text-center text-white">No Film Avalaible😒</h3>
            </Card>
          </Col>
        ) : (
          <>
            {films.map((film) => (
              <Col md={3} key={film.id} className="mb-3">
                <Link to="#" className="text-decoration-none">
                  <Card className="rounded shadow border-0 bg-dark text-white p-5"></Card>
                </Link>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default AllMovies;
