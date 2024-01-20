import React from "react";
import { Row, Col, Button } from "react-bootstrap";
const CheckedStep = ({ step1, step2, step3, step4 }) => {
  return (
    <div>
      <Row className="py-2">
        <Col>
          {step1 ? (
            <Button className="btn" size="sm">
              loggedIn
            </Button>
          ) : (
            <Button className="btn" disabled={true} size="sm">
              loggedIn
            </Button>
          )}
        </Col>{" "}
        <Col>
          {step2 ? (
            <Button className="btn" size="sm">
              shipping
            </Button>
          ) : (
            <Button className="btn" disabled={true} size="sm">
              Shipping
            </Button>
          )}
        </Col>{" "}
        <Col>
          {step3 ? (
            <Button className="btn" size="sm">
              payment
            </Button>
          ) : (
            <Button className="btn" disabled={true} size="sm">
              payment
            </Button>
          )}
        </Col>{" "}
        <Col>
          {step4 ? (
            <Button className="btn" size="sm">
              place-order
            </Button>
          ) : (
            <Button className="btn" disabled={true} size="sm">
              place-order
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CheckedStep;
