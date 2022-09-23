import React from "react";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="rounded shadow border-0 bg-dark text-white p-5">
            <h3 className="text-center">Test</h3>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
