import React, { useState, useEffect } from "react";
import FormContainer from "../component/formContainer";
import CheckedStep from "../component/checkedStep";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shippingAddress } from "../slices/cartslice";

const Shipping = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userCredentials);
  useEffect(() => {
    if (!user) navigate("/logIn");
  }, [user, navigate]);

  const {
    shippingAddress: { address, city, postalCode, country },
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    address: address || "",
    city: city || "",
    postalCode: postalCode || "",
    country: country || "",
  });
  const onChangeHandler = (e) => {
    setInfo((prevalue) => ({
      ...prevalue,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(shippingAddress({ ...info }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckedStep step1 step2 />
      <h4 className="py-2">Shopping Step</h4>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="Address">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={info.address}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Address"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={info.city}
            onChange={(e) => onChangeHandler(e)}
            placeholder="city"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={info.postalCode}
            onChange={(e) => onChangeHandler(e)}
            placeholder="postal Code"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={info.country}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Country"
          />
        </Form.Group>
        <Button
          className="btn btn-primary"
          type="submit"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
