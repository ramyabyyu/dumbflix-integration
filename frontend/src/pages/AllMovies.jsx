import React from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFilms, reset } from "../features/film/filmSlice";
import * as Path from "../routeNames";

const AllMovies = () => {
  const { films, isLoading, isError, message } = useSelector(
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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center ailg-items-center mt-5">
        <Spinner
          animation="border"
          variant="danger"
          style={{
            width: "200px",
            height: "200px",
            borderWidth: "1rem",
            opacity: "0.6",
          }}
        />
      </div>
    );
  }

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
              <Col md={2} key={film.id} className="mb-5 me-2">
                <Link
                  to={Path.MOVIE_DETAIL + film?.slug}
                  className="text-decoration-none"
                >
                  <Card className="rounded shadow border-0 bg-dark text-white p-0">
                    <Card.Img
                      variant="top"
                      src={film?.thumbnail_film}
                      height={300}
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body>
                      <h5>{film?.title}</h5>
                      <p className="text-muted">{film?.year}</p>
                    </Card.Body>
                  </Card>
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
