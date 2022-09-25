import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";
import "../assets/css/Subscribe.modules.css";
import { useSelector, useDispatch } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import {
  createTransaction,
  reset,
} from "../features/transaction/transactionSlice";
import * as Path from "../routeNames";
import { API } from "../config/api";

const Subscibe = () => {
  const { transactions, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.transaction
  );

  const { user } = useSelector((state) => state.auth);

  console.log("user=", user.token);

  const hiddenFileInput = useRef(null);

  const handleFileInput = (e) => hiddenFileInput.current.click();

  const [transferImg, setTransferImg] = useState("");
  const [transferImgSrc, setTransferImgSrc] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (transferImg) {
      const reader = new FileReader();

      reader.onloadend = () => {
        let result = reader.result;
        document.getElementById("transfer-img").classList.remove("d-none");
        setTransferImgSrc(result);
      };

      reader.readAsDataURL(transferImg);
    }
  }, [transferImg]);

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    // if (isSuccess) {
    //   window.snap.pay(token, {
    //     onSuccess: function (result) {
    //       navigate(Path.PROFILE);
    //     },
    //     onPending: function (result) {
    //       navigate(Path.SUBSCRIBE);
    //     },
    //     onError: function (result) {
    //       console.log(result);
    //     },
    //     onClose: function (result) {
    //       alert("You closed the popup without finishing the payment");
    //     },
    //   });
    // }
  }, []);

  const handleBuy = async (e) => {
    // const tokenInJSON = JSON.parse(localStorage.getItem("user"));
    // const authToken = tokenInJSON.token;
    try {
      e.preventDefault();
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${authToken}`,
      //   },
      // };

      const formData = new FormData();
      formData.set("user_id", user?.id);
      formData.set("email", user?.email);

      const response = await API.post("/transaction", formData);
      console.log(response);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          navigate(Path.PROFILE);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          navigate(Path.SUBSCRIBE);
        },
        onError: function (result) {
          /* You may add your own implementation here */
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded shadow bg-dark text-white border-0">
            <h3 className="text-center fw-bold mb-5">Premium</h3>
            <p className=" p-0 text-center">
              Pay now and enjoy streaming film on{" "}
              <span className="fw-bold text-danger text-uppercase">
                Dumbflix
              </span>
            </p>
            <p className="m-0 p-0 fw-bold text-center">
              <span className="fw-bold text-danger text-uppercase">
                Dumbflix
              </span>{" "}
              : 08123123123
            </p>
            <Form className="mt-5 w-50 mx-auto">
              <input
                name="user_id"
                id="user_id"
                className="d-none"
                value={user?.id}
              />
              <div className="mb-3">
                <Form.Control
                  className="input__payment bg-secondary"
                  name="accountNumber"
                  placeholder="Input your account number"
                  type="text"
                />
              </div>
              <div className={transferImg === "" ? "mb-5" : "mb-3"}>
                <input
                  type="file"
                  className="d-none"
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={(e) => setTransferImg(e.target.files[0])}
                />
                <Button
                  variant="light"
                  className="d-flex text-danger justify-content-between w-100 fw-bold"
                  onClick={handleFileInput}
                >
                  <span>Attache proof of transfer</span>
                  <span>
                    <FaPaperclip />
                  </span>
                </Button>
              </div>
              <div className="my-3">
                <img
                  src={transferImgSrc}
                  alt=""
                  className="transfer__img d-none"
                  id="transfer-img"
                />
              </div>
              <div>
                <Button
                  type="button"
                  variant="danger"
                  className="w-100 fw-bold"
                  onClick={handleBuy}
                >
                  Send
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscibe;
