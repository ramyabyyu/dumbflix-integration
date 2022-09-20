import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/Auth.modules.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { reset, register, login } from "../features/auth/authSlice";

const initialUserState = {
  email: "",
  password: "",
  full_name: "",
  gender: "",
  phone: "",
  address: "",
  photo: "",
};

const AuthModal = ({ show, handleClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  const [showPw, setShowPw] = useState(false);

  const [userData, setUserData] = useState(initialUserState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const switchMode = () => {
    setShowPw(false);
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      handleClose();
    }

    if (isSuccess || user) {
      navigate("/");
      toast.success("Welcome");
      handleClose();
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) dispatch(register(userData));
    else dispatch(login(userData));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-dark text-white border-0">
        <Modal.Title>{isRegister ? "Register" : "Login"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white border-0">
        <Form className="px-1" onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              name="email"
              className="bg-group"
              placeholder="Email"
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>

          {/* Password */}
          <div className="mb-3 pw__container">
            <Form.Group controlId="password">
              <Form.Control
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="Password"
                className="bg-group"
                onChange={handleChange}
              />
            </Form.Group>
            <div
              className="pw__icon-container"
              onClick={() => setShowPw(!showPw)}
            >
              {showPw ? (
                <FaEyeSlash className="pw__icon" />
              ) : (
                <FaEye className="pw__icon" />
              )}
            </div>
          </div>

          {/* Full Name */}
          {isRegister && (
            <Form.Group className="mb-3" controlId="full_name">
              <Form.Control
                type="text"
                name="full_name"
                placeholder="Full Name"
                className="bg-group"
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {/* Gender */}
          {isRegister && (
            <Form.Select
              className="mb-3 bg-group"
              onChange={handleChange}
              name="gender"
            >
              <option disabled selected>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          )}

          {/* Phone
           */}
          {isRegister && (
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                name="phone"
                type="number"
                placeholder="Phone"
                className="bg-group"
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {/* Address */}
          {isRegister && (
            <Form.Group className="mb-3" controlId="address">
              <Form.Control
                as="textarea"
                name="address"
                placeholder="Address"
                className="bg-group"
                onChange={handleChange}
              />
            </Form.Group>
          )}
          <div className="bg-dark text-white border-0 d-grid gap-2 p-4">
            <Button
              variant={isRegister ? "light" : "danger"}
              type="submit"
              className={isRegister ? "text-danger" : "text-white"}
              disabled={isLoading == true}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" variant="secondary" />
                </>
              ) : isRegister ? (
                "Register"
              ) : (
                "Login"
              )}
            </Button>
            <p className="text-muted text-center mt-2">
              {isRegister
                ? "Already have an account? Click "
                : "Don't have an account? Click "}{" "}
              <span className="switchBtn text-primary" onClick={switchMode}>
                Here
              </span>
            </p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
