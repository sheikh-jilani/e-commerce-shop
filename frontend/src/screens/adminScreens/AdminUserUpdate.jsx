import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../../component/Message";
import { errorAlert, successAlert } from "../../component/alert";
import FormContainer from "../../component/formContainer";
import Loader from "../../component/loader";
import {
  useGetUserByIdQuery,
  useUpdateAdminUserMutation,
} from "../../slices/authSlice";

const AdminUserUpdate = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [update, { isLoading: updateLoading }] = useUpdateAdminUserMutation();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const { name, username, isAdmin } = detail;
  useEffect(() => {
    setDetail({
      name: user ? user.name : "",
      username: user ? user.username : "",
      isAdmin: user ? Boolean(user.isAdmin) : false,
    });
  }, [user, isLoading]);

  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    console.log(value);
    setDetail((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      console.log(await update({ ...detail, id }).unwrap());
      successAlert("successfully updated");
      navigate(-1);
    } catch (error) {
      errorAlert(error?.data?.message || error?.error);
    }
  };

  return (
    <>
      <FormContainer>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error?.error}</Message>
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={onChangeHandler}
                placeholder="any name"
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="username"
                value={username}
                onChange={onChangeHandler}
                placeholder="email@gmail.com"
              />
            </Form.Group>
            <Form.Check
              name="isAdmin"
              value={isAdmin}
              checked={isAdmin}
              isValid={isAdmin}
              onChange={() => setDetail((x) => ({ ...x, isAdmin: !isAdmin }))}
              type="switch"
              id="custom-switch"
              label="ADMIN"
            />
            {!updateLoading && (
              <Button
                className="btn btn-block btn-primary"
                type="submit"
                onSubmit={onSubmitHandler}
              >
                Update
              </Button>
            )}
          </Form>
        )}
      </FormContainer>{" "}
    </>
  );
};

export default AdminUserUpdate;
