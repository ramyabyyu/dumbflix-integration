import React from "react";
import { useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import dumbflixLogo from "../assets/images/dumbflix_logo.png";
import { useEffect } from "react";
import noPeople from "../assets/images/no-people.png";
import {
  FaUserAlt,
  FaMoneyBillAlt,
  FaSignOutAlt,
  FaFilm,
  FaDollarSign,
} from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useSelector } from "react-redux";

const Header = () => {
  // Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [isLogin, setIsLogin] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    if (user) setIsLogin(true);
    else setIsLogin(false);
  }, [user]);

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="sticky-sm-top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} className="fw-bold" to="/">
              Home
            </Nav.Link>
            <Nav.Link className="fw-bold" to="all-movies" as={Link}>
              Show All Movies
            </Nav.Link>
          </Nav>
          <div>
            <Link className="navbar-brand text-danger" to="/">
              <img src={dumbflixLogo} alt="dumbflix" />
            </Link>
          </div>
          <Nav className="ms-auto">
            {isLogin ? (
              <Dropdown>
                <Dropdown.Toggle id="user-dropdown" variant="dark">
                  <img
                    src={noPeople}
                    alt="no people"
                    width={40}
                    className="rounded-pill"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  <Dropdown.Item href="/profile">
                    <FaUserAlt className="text-danger me-2" />{" "}
                    <span>Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Item href="/payment">
                    <FaMoneyBillAlt className="text-danger me-2" />{" "}
                    <span>Pay</span>
                  </Dropdown.Item>
                  {/* {isAdmin === "true" && (
                    <>
                      <Dropdown.Item href="/add-film">
                        <FaFilm className="text-danger me-2" />{" "}
                        <span>Add Film</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="/transaction">
                        <FaDollarSign className="text-danger me-2" />{" "}
                        <span>Transaction</span>
                      </Dropdown.Item>
                    </>
                  )} */}
                  <Dropdown.Divider className="bg-secondary" />
                  <Dropdown.Item href="#" onClick={handleLogout}>
                    <FaSignOutAlt className="text-danger me-2" />
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="danger" onClick={handleShow}>
                Sign In
              </Button>
            )}
            <AuthModal show={show} handleClose={handleClose} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
