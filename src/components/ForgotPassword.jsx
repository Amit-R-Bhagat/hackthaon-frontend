import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    axios
      .post(
        "http://localhost:4000/api/v1/forgotpassword",
        {
          email,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSubmitted(res.data.success);
      });

    e.preventDefault();
  }
  return (
    <div className="login d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            {!submitted ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  reset password
                </Button>
              </Form>
            ) : (
              <div>submitted</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
