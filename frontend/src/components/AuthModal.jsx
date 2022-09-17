import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { Button, Form, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/Auth.modules.css";
import * as AuthTypes from "../types/auth";
import { useEffect } from "react";

const initialUserState = {
  email: "",
  password: "",
  full_name: "",
  gender: "",
  phone: "",
  address: "",
};

const AuthModal = ({ show, handleClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  const [showPw, setShowPw] = useState(false);

  const [userData, setUserData] = useState(initialUserState);

  const [errResMsg, setErrResMsg] = useState("");

  const [state, dispatch] = useContext(UserContext);

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

  const navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      let response;

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (isRegister) {
        response = await API.post("/register", userData, config);
      } else {
        response = await API.post("/login", userData, config);
      }

      if (response?.status == 200) {
        dispatch({
          type: AuthTypes.AUTH_SUCCESS,
          payload: response.data.data,
        });

        handleClose();
        navigate("profile");
      }
    } catch (error) {
      dispatch({
        type: AuthTypes.AUTH_ERROR,
      });
      setErrResMsg(error.response.data.message);
    }
  });

  useEffect(() => {
    if (errResMsg !== "") {
      const formAlert = document.getElementById("form-alert");
      formAlert.classList.remove("d-none");
    }
  }, [errResMsg, isRegister]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-dark text-white border-0">
        <Modal.Title>{isRegister ? "Register" : "Login"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white border-0">
        <div
          id="form-alert"
          class="alert alert-danger fade show d-none"
          role="alert"
        >
          <strong>{errResMsg}</strong>
        </div>
        <Form className="px-1" onSubmit={(e) => handleSubmit.mutate(e)}>
          {/* Email */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              name="email"
              className="bg-group"
              placeholder="Email"
              onChange={handleChange}
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
            >
              {isRegister ? "Register" : "Login"}
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
