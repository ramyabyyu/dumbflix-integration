import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const initialState = {
  full_name: "",
  email: "",
  password: "",
  address: "",
  gender: "",
  phone: "",
};

const Auth = () => {
  const [userData, setUserData] = useState(initialState);

  const [state, dispatch] = useContext(UserContext);

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/register", userData);
      console.log(response.data.data);
      if (response.status === 200) {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {}, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="rounded shadow border-0 p-5">
            <Form onSubmit={(e) => handleSubmit.mutate(e)} method="POST">
              <Form.Group className="mb-3">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="full_name"
                  type="text"
                  placeholder="full name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="gender"
                  type="text"
                  placeholder="gender"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="address"
                  type="text"
                  placeholder="address"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder="phone"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="mb-3">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
