import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/css/AddFilm.modules.css";
import { API } from "../../config/api";

const AddFilm = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [filmData, setFilmData] = useState({
    title: "",
    thumbnail_film: "",
    description: "",
    year: "",
    category: "",
  });

  const tokenAdmin = localStorage.getItem("is_admin");

  const navigate = useNavigate();

  const hiddenFileInput = useRef(null);

  const handleFileInput = (e) => hiddenFileInput.current.click();

  useEffect(() => {
    if (!tokenAdmin) {
      navigate("/");
    }
  }, [tokenAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/film", filmData);
      console.log(response);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (thumbnailUrl !== "") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setFilmData({ ...filmData, thumbnail_film: result });
      };
      reader.readAsDataURL(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded shadow border-0 bg-dark text-white p-5">
            <h3 className="text-center mb-4">Add Film</h3>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="d-flex align-items-center mb-3">
                <Form.Group className="w-50" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={(e) =>
                      setFilmData({ ...filmData, title: e.target.value })
                    }
                    placeholder="Title"
                    className="bg-group"
                  />
                </Form.Group>
                <Form.Group className="mx-3 w-50">
                  <input
                    type="file"
                    name="thumbnail_film"
                    id="thumbnail_film"
                    accept="iamge/*"
                    onChange={(e) => setThumbnailUrl(e.target.files[0])}
                    className="d-none"
                    ref={hiddenFileInput}
                  />
                  <Button
                    variant="danger"
                    type="button"
                    className="mt-4"
                    onClick={handleFileInput}
                  >
                    Attach Thumbnail
                  </Button>
                  <Form.Label className="ms-3">{thumbnailUrl.name}</Form.Label>
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={(e) =>
                    setFilmData({ ...filmData, description: e.target.value })
                  }
                  placeholder="Description"
                  className="bg-group"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  onChange={(e) =>
                    setFilmData({
                      ...filmData,
                      year: e.target.value,
                    })
                  }
                  placeholder="Year"
                  className="bg-group"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  className="bg-group"
                  name="category"
                  onChange={(e) =>
                    setFilmData({ ...filmData, category: e.target.value })
                  }
                >
                  <option selected disabled>
                    Category
                  </option>
                  <option value="Movies">Movies</option>
                  <option value="Tv Series">Tv Series</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFilm;
