import React from "react";
import { useEffect } from "react";
import {
  Dropdown,
  Form,
  Table,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTransactions,
  reset,
} from "../../features/transaction/transactionSlice";
import LoadingSpinner from "../../components/LoadingSpinner";

function Transactions() {
  const { user } = useSelector((state) => state.auth);
  const { transactions, isSuccess, isLoading } = useSelector(
    (state) => state.transaction
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !user?.is_admin) {
      navigate("/");
    }

    dispatch(getTransactions());

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, user]);

  if (isLoading) {
    return <LoadingSpinner size="big" />;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="rounded shadow border-0 bg-dark text-white p-3">
            <h6 className="text-light mb-4 mx-4">Transactions List</h6>
            <Table striped bordered hover variant="dark">
              <thead style={{ height: "60px" }}>
                <tr className="text-danger text-center align-items-center">
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Proof of Transfer</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status User</th>
                  <th>Status Payment</th>
                  <th style={{ width: "60px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length < 1 ? (
                  <tr style={{ height: "60px" }} className="text-center">
                    <td colSpan={9}>
                      <p className="mt-1">No Transaction Available</p>
                    </td>
                  </tr>
                ) : (
                  <tr style={{ height: "60px" }} className="text-center">
                    <td>1</td>
                    <td>Ramy Ganteng</td>
                    <td>ramy@ganteng.com</td>
                    <td>bca.jpg</td>
                    <td>26 / Hari</td>
                    <td>26 / Hari</td>
                    <td className="text-success">Active</td>
                    <td className="text-success">Approve</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="dark"></Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                          <Form>
                            <Dropdown.Item>
                              <input
                                type="text"
                                value="Approve"
                                className="d-none"
                              />
                              <h6 className="text-success fw-bold">Approve</h6>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <input
                                type="text"
                                value="Cancel"
                                className="d-none"
                              />
                              <h6 className="text-danger fw-bold">Cancel</h6>
                            </Dropdown.Item>
                          </Form>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Transactions;
