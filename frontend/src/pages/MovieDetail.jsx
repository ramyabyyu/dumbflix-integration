import React from "react";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilmDetail, reset } from "../features/film/filmSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import "../assets/css/Detail.modules.css";
import detailImg from "../assets/images/detail.jpg";

const MovieDetail = () => {
  const { slug } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { films, isLoading, isError, message } = useSelector(
    (state) => state.film
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !user.is_admin || !user.is_active) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) console.log(message);

    dispatch(getFilmDetail(slug));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, navigate]);

  if (isLoading) return <LoadingSpinner size="big" />;

  return (
    <>
      <div className="d-flex justify-content-center">
        <iframe
          src={films?.link_film}
          width={1000}
          height={500}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={films?.title}
        ></iframe>
      </div>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Card
              className="rounded border-0 shadow bg-dark text-white p-2"
              style={{ width: "500px" }}
            >
              <Card.Body className="d-flex">
                <div className="me-5">
                  <img
                    src={films?.thumbnail_film}
                    alt="thumbnail film"
                    width={160}
                  />
                </div>
                <div>
                  {/* Header */}
                  <div>
                    <h3>{films?.title}</h3>
                    <div className="d-flex align-items-center mt-4">
                      <p className="m-0 p-0 text-muted">{films?.year}</p>
                      <span className="px-2 ms-3 border border-secondary text-muted rounded">
                        {films?.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4">{films?.description}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="rounded shadow border-0 bg-dark text-white position-relative"
              style={{ width: "20rem" }}
            >
              <img
                src={films?.thumbnail_film}
                className="rounded episode__img"
              />
              <div className="position-absolute episode__img-overlay">
                <h5 className="fw-bold">In play now</h5>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieDetail;
