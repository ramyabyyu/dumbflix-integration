import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import "../assets/css/Subscribe.modules.css";

const Subscibe = () => {
  const hiddenFileInput = useRef(null);

  const handleFileInput = (e) => hiddenFileInput.current.click();

  const [transferImg, setTransferImg] = useState("");
  const [transferImgSrc, setTransferImgSrc] = useState("");

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

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded shadow bg-dark text-white border-0">
            <h3 className="text-center fw-bold mb-5">Premium</h3>
            <p className=" p-0 text-center">
              Bayar sekarang dan nikmati streaming film-film yang kekinian dari{" "}
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
                  type="submit"
                  variant="danger"
                  className="w-100 fw-bold"
                >
                  Kirim
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
