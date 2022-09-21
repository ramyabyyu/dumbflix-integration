import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddFilm = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !user?.is_admin) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container className="mt-5">
      <Row className="justify-conten-center">
        <Col md={6}>
          <Card className="rounded shadow border-0 bg-dark text-white p-5">
            <h3 className="text-center">Add Film</h3>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFilm;
