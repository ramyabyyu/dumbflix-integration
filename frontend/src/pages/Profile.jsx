import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
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

const Profile = () => {
  // const [userData, setUserData] = useState(initialUserState);

  // const user = JSON.parse(localStorage.getItem("user"));

  // const navigate = useNavigate();

  // // Image Upload
  // const [profileSrc, setProfileSrc] = useState(userData.photo);

  const hiddenFileInput = useRef(null);

  const handleFileInput = (e) => hiddenFileInput.current.click();

  // const handleFileChange = (files) => {
  //   setUserData({ ...userData, photo: files });
  // };

  // useEffect(() => {
  //   if (user) {
  //     setIsLogin(true);
  //     setUserData({
  //       ...userData,
  //       email: user?.email,
  //       password: user?.password,
  //       fullName: user?.fullName,
  //       gender: user?.gender,
  //       phone: user?.phone,
  //       address: user?.address,
  //     });
  //   } else {
  //     setIsLogin(false);
  //     setUserData(initialUserState);
  //     navigate("/");
  //   }
  // }, [user, isLogin]);

  // useEffect(() => {
  //   // Image upload
  //   if (userData.photo != noPeople) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       let result = reader.result;
  //       setProfileSrc(result);
  //     };
  //     reader.readAsDataURL(userData.photo);
  //   }
  // }, [userData.photo]);

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
                      <h5>Ramy Gantenng</h5>
                      <p className="text-muted">Full Name</p>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaEnvelope className="text-danger me-3 fs-1" />
                    <div>
                      <h5>ramy@dumbflix.com</h5>
                      <p className="text-muted">Email Address</p>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaRegMoneyBillAlt className="text-danger me-3 fs-1" />
                    <div>
                      <h5>Active</h5>
                      <p className="text-muted">Status</p>
                    </div>
                  </div>
                  {/* Gender */}
                  <div className="d-flex mb-3 align-items-start">
                    {/* {userData.gender === "Male" ? (
                      <FaMale className="text-danger me-3 fs-1" />
                    ) : (
                      <FaFemale className="text-danger me-3 fs-1" />
                    )} */}
                    <FaMale className="text-danger me-3 fs-1" />
                    <div>
                      <h5>Male</h5>
                      <p className="text-muted">Gender</p>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaPhone className="text-danger me-3 fs-1" />
                    <div>
                      <h5>082121273909</h5>
                      <p className="text-muted">Phone Number</p>
                    </div>
                  </div>
                  {/* Address */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaMapMarked className="text-danger me-3 fs-1" />
                    <div>
                      <h5>Jln in aja</h5>
                      <p className="text-muted">Address</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={noPeople} alt="nophoto" className="profile__img" />

                {/* Hidden Upload Input */}
                <input
                  type="file"
                  ref={hiddenFileInput}
                  accept="image/*"
                  className="d-none"
                  // onChange={(e) => handleFileChange(e.target.files[0])}
                />

                <Button
                  variant="danger"
                  className="changePhotoBtn mt-2 btn-lg px-2 py-4"
                  onClick={handleFileInput}
                >
                  Change Photo
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
