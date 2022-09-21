import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaPaperclip } from "react-icons/fa";
import "../../assets/css/AddFilm.modules.css";
import { useState } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, createFilm } from "../../features/film/filmSlice";
import * as Path from "../../routeNames";

const AddFilm = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError } = useSelector((state) => state.film);

  // film data
  const [filmData, setFilmData] = useState({
    title: "",
    thumbnail_film: "",
    category: "",
    year: "",
    description: "",
  });

  // Image Upload
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const hiddenFileInput = useRef(null);
  const handleFileInput = (e) => hiddenFileInput.current.click();
  const handleFileChange = (files) => {
    setFilmData({ ...filmData, thumbnail_film: files });
  };

  const handleChange = (e) => {
    setFilmData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (filmData.thumbnail_film !== "") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setThumbnailPreview(result);
        document.getElementById("preview__container").className = "my-4";
        document.getElementById("img-preview").classList.remove("d-none");
      };
      reader.readAsDataURL(filmData.thumbnail_film);
    }
  }, [filmData.thumbnail_film]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, thumbnail_film, category, description, year } = filmData;

    const formData = new FormData();
    formData.set("title", title);
    formData.set("file", thumbnail_film, thumbnail_film.name);
    formData.set("category", category);
    formData.set("description", description);
    formData.set("year", year);

    dispatch(createFilm(formData));
  };

  useEffect(() => {
    if (isSuccess) navigate(Path.HOME);
    if (isError) console.log("Something Wrong I can feel it");

    dispatch(reset());
  }, [isSuccess, isError, dispatch, reset]);

  useEffect(() => {
    if (!user && !user?.is_admin) {
      navigate(Path.HOME);
    }
  }, [user, navigate]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="rounded shadow border-0 bg-dark text-white p-2">
            <h3 className="text-center mb-5">Add Film</h3>
            <Form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
            >
              <div className="d-flex mb-2">
                <Form.Control
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  className="bg-group me-1"
                  onChange={handleChange}
                />
                <input
                  type="file"
                  name="thumbnail_file"
                  id="thumbnail_film"
                  className="d-none"
                  ref={hiddenFileInput}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <Button
                  variant="light"
                  className="text-danger d-flex align-items-center fw-bold"
                  type="button"
                  onClick={handleFileInput}
                >
                  <FaPaperclip /> <span className="ms-2">Attache</span>
                </Button>
              </div>
              <div className="m-0" id="preview__container">
                <img
                  src={thumbnailPreview}
                  alt="preview"
                  id="img-preview"
                  className="d-none rounded"
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="mb-2">
                <Form.Control
                  className="bg-group"
                  type="number"
                  name="year"
                  id="year"
                  placeholder="Year"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <Form.Select
                  className="bg-group"
                  type="number"
                  name="category"
                  id="category"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Select Category
                  </option>
                  <option value="Tv Series">Tv Series</option>
                  <option value="Movie">Movie</option>
                </Form.Select>
              </div>
              <div className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="bg-group"
                  style={{ resize: "none" }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Button variant="danger" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFilm;
