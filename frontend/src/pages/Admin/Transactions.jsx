import React from "react";
import { Col, Container, Dropdown, Form, Row, Table } from "react-bootstrap";
import { BsFillCaretDownFill } from "react-icons/bs";

function Transactions() {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <h6 className="text-light mb-4 mx-4">Incoming Transaction</h6>
            <Table striped bordered hover variant="dark">
              <thead style={{ height: "60px" }}>
                <tr className="text-danger text-center align-items-center">
                  <th>No</th>
                  <th>Users</th>
                  <th>Bukti Transfer</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status User</th>
                  <th>Status Payment</th>
                  <th style={{ width: "60px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: "60px" }} className="text-center">
                  <td>1</td>
                  <td>Radif Ganteng</td>
                  <td>bca.jpg</td>
                  <td>26 / Hari</td>
                  <td>26 / Hari</td>
                  <td className="text-success">Active</td>
                  <td className="text-success">Approve</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="dark"></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Form>
                          <Dropdown.Item>
                            <input
                              type="text"
                              value="Approve"
                              className="d-none"
                            />
                            <span className="text-success">Approve</span>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <input
                              type="text"
                              value="Cancel"
                              className="d-none"
                            />
                            <span className="text-danger">Cancel</span>
                          </Dropdown.Item>
                        </Form>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Transactions;
