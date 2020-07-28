import React from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import styles from "./index.module.css";

const Login = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className={styles.form}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className={styles["button-container"]}>
              <Button className={styles.button} type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;