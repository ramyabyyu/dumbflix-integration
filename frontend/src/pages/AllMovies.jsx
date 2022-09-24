import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFilms, reset } from "../features/film/filmSlice";
import * as Path from "../routeNames";
import LoadingSpinner from "../components/LoadingSpinner";

const AllMovies = () => {
  const { user } = useSelector((state) => state.auth);
  const { films, isLoading, isError, message } = useSelector(
    (state) => state.film
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("films = ", films);

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
    return <LoadingSpinner size="big" />;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-end mb-5 align-items-center">
        <Col md={2}>
          <Button as={Link} to={Path.ADD_FILM} variant="danger">
            Add Film
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3">
        {films.length < 1 ? (
          <Col md={12}>
            <Card className="rounded shadow border-0 bg-dark text-white p-5">
              <h3 className="text-center text-white">No Film Avalaible😒</h3>
            </Card>
          </Col>
        ) : (
          <>
            {films?.map((film) => (
              <Col md={2} key={film.id} className="mb-5 me-2">
                <Link
                  to={
                    user && user?.is_active
                      ? `${Path.MOVIE_DETAIL}/${film.slug}`
                      : Path.SUBSCRIBE
                  }
                  className="text-decoration-none"
                >
                  <Card className="rounded shadow border-0 bg-dark text-white p-0">
                    <Card.Img
                      variant="top"
                      src={film.thumbnail_film}
                      height={300}
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body>
                      <h5>{film.title}</h5>
                      <p className="text-muted">{film.year}</p>
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
