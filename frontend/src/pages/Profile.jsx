import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import noPeople from "../assets/images/no-people.png";
import "../assets/css/Profile.modules.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FaEnvelope,
  FaFemale,
  FaMale,
  FaMapMarked,
  FaPhone,
  FaRegMoneyBillAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

const Profile = () => {
  // Global State
  const [state] = useContext(UserContext);

  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    is_active: true,
    phone: "",
    gender: "",
    photo: noPeople,
  });

  // state for image change
  const [imgChange, setImgChange] = useState("");

  // state for image src
  const [imgSrc, setImgSrc] = useState(noPeople);

  const navigate = useNavigate();

  const hiddenFileInput = useRef(null);

  const handleFileInput = (e) => hiddenFileInput.current.click();

  const handleFileChange = (files) => {
    // image for preview
    setImgChange(files);
  };

  const fetchProfile = async () => {
    try {
      const { data: profile } = await API.get("/profile");
      console.log(profile);
      setProfileData(profile.data);
      return profile.data;
    } catch (error) {
      console.log(error);
    }
  };

  useQuery("profileCache", fetchProfile);

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("file", imgChange, imgChange.name);

      const response = await API.patch("/profile", formData, config);
      if (response.status === 200) {
        console.log(response);
        setProfileData({
          ...profileData,
          photo: response.data.data.photo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, [localStorage]);

  useEffect(() => {
    if (imgChange !== "") {
      const reader = new FileReader();
      reader.onload = () => {
        let result = reader.result;
        setImgSrc(result);
      };
      reader.readAsDataURL(imgChange);
    }
  }, [imgChange]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded shadow border-0 bg-dark text-white p-5">
            <div className="d-flex justify-content-between">
              <div className="me-5">
                <h3>Personal Info</h3>
                <div className="mt-3">
                  {/* Full Name */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaUserCircle className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{profileData.full_name}</h5>
                      <p className="text-muted">Full Name</p>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaEnvelope className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{profileData.email}</h5>
                      <p className="text-muted">Email Address</p>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaRegMoneyBillAlt className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{profileData.is_active ? "Active" : "Inactive"}</h5>
                      <p className="text-muted">Status</p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="d-flex mb-3 align-items-start">
                    {profileData.gender === "Male" ? (
                      <FaMale className="text-danger me-3 fs-1" />
                    ) : (
                      <FaFemale className="text-danger me-3 fs-1" />
                    )}
                    <div>
                      <h5>{profileData.gender}</h5>
                      <p className="text-muted">Gender</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaPhone className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{profileData.phone}</h5>
                      <p className="text-muted">Phone Number</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaMapMarked className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{profileData.address}</h5>
                      <p className="text-muted">Address</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-50">
                <img
                  src={imgSrc}
                  alt="nophoto"
                  className="profile__img rounded"
                  id="profile-photo"
                />
                <Form
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={(e) => handleSubmit.mutate(e)}
                >
                  {/* Hidden Upload Input */}
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    name="file"
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                  <Button
                    variant="danger"
                    className="w-100 mt-2"
                    onClick={handleFileInput}
                  >
                    Change Photo
                  </Button>
                  <Button
                    variant={imgChange === "" ? "secondary" : "primary"}
                    className="w-100 mt-2"
                    disabled={imgChange === ""}
                    type="submit"
                  >
                    Upload
                  </Button>
                </Form>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
