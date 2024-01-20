import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FormContainer from "../component/formContainer";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../slices/authSlice";
import Loader from "../component/loader";
import { errorAlert, successAlert } from "../component/alert";
import { addUserCredentials } from "../slices/userCredentialSlice";
import { useDispatch, useSelector } from "react-redux";

const LogInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // bringing the value of "redirect" (localhost:3000/login?redirect=/shipping)
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // ?bringing the user state credentials
  const data = useSelector((state) => state.userCredentials);

  // if loggedIn redirect
  useEffect(() => {
    console.log(data);
    if (data.user) navigate(redirect);
  }, [data, navigate, redirect]);

  // sending request to server via ApiSlice action creator
  const [logIn, { isLoading }] = useLogInMutation();

  const [info, setinfo] = useState({ username: "", password: "" });

  // form change handler
  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setinfo((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await logIn(info).unwrap();
      dispatch(addUserCredentials(res));
      successAlert(`loggedin as ${res.name}`);
      navigate(redirect);
    } catch (error) {
      const message = error?.data?.message || error.message;
      errorAlert(message);
    }
    setinfo({ username: "", password: "" });
  };

  return (
    <FormContainer>
      <h1 className="py-2">signIn</h1>
      <Form md="6" onClick={() => submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="username"
            onChange={(e) => onChangehandler(e)}
            value={info.username}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pasword">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={info.password}
            onChange={(e) => onChangehandler(e)}
            placeholder="char+number+symble"
          />
        </Form.Group>
        <Button
          className="btn btn-primary"
          onClick={(e) => submitHandler(e)}
          disable={isLoading.toString()}
        >
          {isLoading ? <Loader /> : "submit"}
        </Button>
      </Form>
      <h5>
        doN't have an account ?{" "}
        <Link to={`/signup?redirect=${redirect}`}>Signup</Link>
      </h5>
    </FormContainer>
  );
};

export default LogInScreen;
