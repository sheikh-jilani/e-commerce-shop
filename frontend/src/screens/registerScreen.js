import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../component/alert";
import FormContainer from "../component/formContainer";
import Loader from "../component/loader";
import { useRegisterMutation } from "../slices/authSlice";
import { addUserCredentials } from "../slices/userCredentialSlice";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  // the value of "redirect" :localhost:3000/signup?redirect=/shipping
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const navigate = useNavigate();

  // get the user state credentials
  const data = useSelector((state) => state.userCredentials);

  useEffect(() => {
    console.log(data);

    // if user exists rediret atonce
    if (data.user) navigate(redirect);
  }, [data, navigate, redirect]);

  const [register, { isLoading }] = useRegisterMutation();
  const [info, setInfo] = useState({
    name: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInfo((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    // confirming password
    if (info.password === info.confirm_password) {
      try {
        // register action to server
        const res = await register(info).unwrap();
        dispatch(addUserCredentials(res)); //setting the userCredentials
        successAlert(`registered as ${res.name}`);

        navigate(redirect);
      } catch (error) {
        console.log(error);
        const message = error?.data?.message || error.message; //error to tostify
        errorAlert(message);
      }
    } else {
      errorAlert("both password didn't match");
    }

    setInfo({
      name: "",
      username: "",
      password: "",
      confirm_password: "",
    });
  };
  return (
    <FormContainer>
      <h3>signUp</h3>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>full name</Form.Label>
          <Form.Control
            onChange={(e) => onChangeHandler(e)}
            name="name"
            value={info.name}
            type="text"
            placeholder="username"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            onChange={(e) => onChangeHandler(e)}
            name="username"
            value={info.username}
            type="email"
            placeholder="name@gmail.com"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            onChange={(e) => onChangeHandler(e)}
            name="password"
            value={info.password}
            type="password"
            placeholder="letter + number + symble"
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>confirm password</Form.Label>
          <Form.Control
            onChange={(e) => onChangeHandler(e)}
            name="confirm_password"
            value={info.confirm_password}
            type="password"
            placeholder="confirm password"
          />
        </Form.Group>
        <Button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => onClickHandler(e)}
          disabled={!isLoading.toString()}
        >
          {isLoading ? <Loader /> : "submit"}
        </Button>
      </Form>
      <h4>
        already have an account{" "}
        <Link to={`/signIn?redirect=${redirect}`}>signIn</Link>
      </h4>
    </FormContainer>
  );
};

export default RegisterScreen;
