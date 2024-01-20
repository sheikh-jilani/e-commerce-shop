import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const currentDate = new Date().getFullYear();
const Pro = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col style={{ "text-align": "center" }}>
            Proshop @copy; {currentDate}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pro;
