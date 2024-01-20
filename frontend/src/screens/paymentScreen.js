import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckedStep from "../component/checkedStep";
import FormContainer from "../component/formContainer";
import { savePaymentMethod } from "../slices/cartslice";

const PaymentMent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userCredentials);
  const { shippingAddress } = useSelector((state) => state.cart);
  const [pay, setPayment] = useState("paypal or credit");

  useEffect(() => {
    if (!user) {
      navigate("/logIn");
    } else if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [user, shippingAddress, navigate]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setPayment(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(pay));
    navigate("/orderPlace");
  };

  return (
    <FormContainer>
      <CheckedStep step1 step2 step3 />

      <h2 className="my-3">Payment</h2>
      <Form onSubmit={(e) => onSubmitHandler(e)}>
        <h4 style={{ marginBottom: "0px" }}>selete a method</h4>
        <div className="form-check">
          <input
            defaultChecked
            className="form-check-input"
            type="radio"
            name="payment"
            id="paypal"
            value="paypal or credit"
            onChange={(e) => onChangeHandler(e)}
          />
          <label className="form-check-label" htmlFor="paypal">
            paypal or credit
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="COD"
            value="cash"
            onChange={(e) => onChangeHandler(e)}
          />
          <label className="form-check-label" htmlFor="COD">
            cash on delirevy
          </label>
        </div>
        <Button
          className="btn btn-sm my-4"
          type="submit"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMent;
