import React from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../slices/cartslice";
import { useDispatch } from "react-redux";
import { successAlert } from "./alert";

const CartProduct = ({ item }) => {
  const dispatch = useDispatch();
  const onClickHandler = (x) => {
    successAlert(` ${item.name} quantity updated to ${x.target.value} `);
    dispatch(addToCart({ ...item, qnty: x.target.value }));
  };
  return (
    <Row style={{ margin: "1rem 0 " }}>
      <Col md={3}>
        <Image
          style={{ height: "110px" }}
          src={item.image}
          alart={`image of ${item.name}`}
        />
      </Col>
      <Col md={3}>{item.name}</Col>
      <Col md={2}>${item.price * item.qnty}</Col>
      <Col md={3}>
        <Form.Select onChange={onClickHandler}>
          {[...Array(item.countInStock).keys()].map((x, index) => (
            <option
              onChange={(e) => {
                onClickHandler(e);
              }}
              selected={x + 1 == item.qnty}
              value={x + 1}
              key={index}
            >
              {x + 1}
            </option>
          ))}{" "}
        </Form.Select>
      </Col>
      <Col md={1}>
        <MdDeleteForever
          style={{ height: "3rem", width: "2.4rem" }}
          onClick={() => {
            toast.info(` ${item.name} removed from the cart `, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            dispatch(removeFromCart(item._id));
          }}
        />
      </Col>
    </Row>
  );
};

export default CartProduct;
