import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import noPeople from "../assets/images/no-people.png";
import "../assets/css/Profile.modules.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FaEnvelope,
  FaMapMarked,
  FaPhone,
  FaRegMoneyBillAlt,
  FaUserCircle,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import * as Path from "../routeNames";
import { getProfile, reset } from "../features/profile/profileSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile, isSuccess, isLoading, isError, messgae } = useSelector(
    (state) => state.profile
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const hiddenFileInput = () => {};
  // const handleFileInput = () => {};
  // const handleFileChange = (files) => {};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  useEffect(() => {
    if (user) {
      dispatch(getProfile());
    } else navigate(Path.HOME);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, reset]);

  if (isLoading) {
    return <LoadingSpinner size="big" />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded shadow border-0 bg-dark text-white p-5">
            <div className="d-flex justify-content-between">
              <div className="me-5">
                <div className="mt-3">
                  {/* Full Name */}
                  <div className="d-flex mb-3 align-items-start">
                    {user?.is_admin ? (
                      <RiAdminFill className="text-danger me-3 fs-1" />
                    ) : (
                      <FaUserCircle className="text-danger me-3 fs-1" />
                    )}
                    <div>
                      <h5>
                        {profile?.full_name}{" "}
                        {user?.is_admin && <Badge bg="danger">Admin</Badge>}
                      </h5>
                      <p className="text-muted">Full Name</p>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaEnvelope className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{user?.email}</h5>
                      <p className="text-muted">Email Address</p>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaRegMoneyBillAlt className="text-danger me-3 fs-1" />
                    <div>
                      <h5
                        className={
                          profile?.is_active ? "text-success" : "text-danger"
                        }
                      >
                        {profile?.is_active ? "Active" : "Inactive"}
                      </h5>
                      <p className="text-muted">Status</p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="d-flex mb-3 align-items-start">
                    {profile?.gender === "Male" ? (
                      <FaMale className="text-danger me-3 fs-1" />
                    ) : (
                      <FaFemale className="text-danger me-3 fs-1" />
                    )}
                    <div>
                      <h5>{profile?.gender}</h5>
                      <p className="text-muted">Gender</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaPhone className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{profile?.phone}</h5>
                      <p className="text-muted">Phone Number</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="d-flex mb-3 align-items-start">
                    <FaMapMarked className="text-danger me-3 fs-1" />
                    <div>
                      <h5>{profile?.address}</h5>
                      <p className="text-muted">Address</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-50">
                <img
                  src={profile?.photo !== "-" ? profile?.photo : noPeople}
                  alt="nophoto"
                  className="profile__img rounded"
                  id="profile-photo"
                />
                <Form
                  method="POST"
                  encType="multipart/form-data"
                  // onSubmit={handleSubmit}
                >
                  {/* Hidden Upload Input */}
                  {/* <input
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
                    variant="primary"
                    className="w-100 mt-2"
                    type="submit"
                  >
                    Upload
                  </Button> */}
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
