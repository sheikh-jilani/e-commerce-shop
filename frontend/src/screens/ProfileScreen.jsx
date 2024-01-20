import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../component/Message";
import { errorAlert, successAlert } from "../component/alert";
import Loader from "../component/loader";
import { useUpdateUserMutation } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderSlice";
import { addUserCredentials } from "../slices/userCredentialSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  //user credentials
  const { user } = useSelector((state) => state.userCredentials);
  const [detail, setdetail] = useState({}); //form inputs

  useEffect(() => {
    //when ever user sate is changed form inputs will change
    setdetail({
      name: user.name,
      username: user.username,
      password: "",
      oldPassword: "",
      confirmPassword: "",
    });
  }, [user]);

  //mutation to backend to update user
  const [updateUser] = useUpdateUserMutation();

  const onchangeHandler = (ev) => {
    const { name, value } = ev.target;
    setdetail((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      //check new passwords
      if (detail.password === detail.confirmPassword) {
        //call mutations
        const res = await updateUser(detail).unwrap();
        dispatch(addUserCredentials(res)); //update user credential sate
        successAlert("successfully updated");
      } else {
        //pass mismatch
        errorAlert("new password and confirm password didn't match");
      }
    } catch (error) {
      //error form backend server
      errorAlert(error?.data?.message);
    }
  };

  //? order table -----------------//////////////////////////

  const { data, error, isLoading } = useGetMyOrdersQuery();
  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <h1> user's profile</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup controlId="name">
                <FormLabel>Name</FormLabel>
                <FormControl
                  type="text"
                  name="name"
                  value={detail.name}
                  onChange={(ev) => onchangeHandler(ev)}
                />
              </FormGroup>
              <FormGroup controlId="username">
                <FormLabel>email</FormLabel>
                <FormControl
                  type="email"
                  name="username"
                  value={detail.username}
                  onChange={(ev) => onchangeHandler(ev)}
                />
              </FormGroup>
              <FormGroup controlId="oldPassword">
                <FormLabel>old password</FormLabel>
                <FormControl
                  type="password"
                  name="oldPassword"
                  value={detail.oldPassword}
                  onChange={(ev) => onchangeHandler(ev)}
                />
              </FormGroup>
              <FormGroup controlId="new password">
                <FormLabel>new password</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={detail.password}
                  onChange={(ev) => onchangeHandler(ev)}
                />
              </FormGroup>
              <FormGroup controlId="confirm password">
                <FormLabel>conform password</FormLabel>
                <FormControl
                  type="password"
                  name="confirmPassword"
                  value={detail.confirmPassword}
                  onChange={(ev) => onchangeHandler(ev)}
                />
              </FormGroup>
              <Button onClick={(ev) => handleSubmit(ev)}>update</Button>
            </Form>
          </Col>
          <Col md={8}>
            <h3>my orders</h3>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Loader />
                ) : error ? (
                  <tr>
                    {" "}
                    <Message variant={"danger"}>
                      {error?.data?.message || error?.error}
                    </Message>
                  </tr>
                ) : (
                  data.map((order) => (
                    <tr key={order._id}>
                      <th>{order._id}</th>
                      <th>{order.createdAt.substring(0, 10)}</th>
                      <th>{order.totalPrice}</th>
                      <th>
                        {!order.isPayed ? (
                          <ImCross />
                        ) : (
                          order.payedAt.substring(0, 10)
                        )}
                      </th>
                      <th>
                        {!order.isDelivered ? (
                          <ImCross />
                        ) : (
                          order.deliveredAt.substring(0, 10)
                        )}
                      </th>

                      <th>
                        <LinkContainer to={`/orders/${order._id}`}>
                          <button className="btn btn-dark">Details</button>
                        </LinkContainer>
                      </th>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
