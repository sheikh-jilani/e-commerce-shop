import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartProduct from "../component/CartProduct";

const CartScreen = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((STATE) => STATE.cart);
  const clickHandler = () => {
    navigate("/signIn?redirect=/shipping");
  };
  return (
    <>
      <Container>
        {cartItems.length > 0 ? (
          <Row>
            <Col md={8}>
              <h3 style={{ margin: "1rem 0 1.7rem" }}>Shopping Cart</h3>
              {cartItems.map((item, index) => (
                <CartProduct key={index} item={item} />
              ))}
            </Col>
            <Col md={4}>
              <Row>
                <h4>subtotal({cartItems.length}) items</h4>
                <p>${totalPrice}</p>
              </Row>
              <Row>
                <Col md={8}>
                  {" "}
                  <button className="btn btn-primary" onClick={clickHandler}>
                    Proceed to Checkout
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <h4>
            {" "}
            Cart is empty🤷‍♂️🤷‍♂️...<Link to={"/"}>Go Shopping 😊</Link>
          </h4>
        )}
      </Container>
    </>
  );
};

export default CartScreen;
