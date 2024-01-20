import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { BiLoader } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Message from "../component/Message";
import { errorAlert, successAlert } from "../component/alert";
import {
  useGetOrderQuery,
  useSetDeliveredMutation,
} from "../slices/orderSlice";
import { useGetAllProductsQuery } from "../slices/productSlice";
const PlaceOrderScreen = () => {
  const { user } = useSelector((state) => state.userCredentials);
  const { id: orderId } = useParams();
  const { data: products, isLoading: loadingProducts } =
    useGetAllProductsQuery();
  const { data, error, isLoading, refetch } = useGetOrderQuery(orderId);
  const [delivered, { isLoading: loadingDeliver }] = useSetDeliveredMutation();

  const onClickHandler = async () => {
    if (window.confirm("delivary done?")) {
      try {
        const res = await delivered(orderId).unwrap();
        refetch();
        successAlert(res);
      } catch (error) {
        errorAlert(error?.data?.message || error?.error);
      }
    }
  };
  return (
    <>
      <Container>
        <h3>order {orderId}</h3>
        {isLoading ? (
          <BiLoader />
        ) : error ? (
          <Message variant="danger">
            {error?.message || error?.data?.message}
          </Message>
        ) : (
          <Row>
            <Col md={8}>
              <h3>Shopping</h3>
              <ListGroup>
                <ListGroupItem>
                  <p>
                    {" "}
                    <strong>Name : </strong>
                    {data.userId.name}
                  </p>
                  <p>
                    {" "}
                    <strong>Email : </strong>
                    {data.userId.username}
                  </p>
                  <p>
                    {" "}
                    <strong>Address : </strong>
                    {data.shippingAddress.address},
                    {data.shippingAddress.postalCode},
                    {data.shippingAddress.city},{data.shippingAddress.country}
                  </p>
                  {!data.isDelivered ? (
                    <Message variant="danger">Not Delivered</Message>
                  ) : (
                    <Message variant="success">
                      delivered on {data.deliveredAt.substring(0, 10)}
                    </Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h3>Payment</h3>
                  <p>
                    <strong>payment Method : </strong>
                    {data.paymentMethod}
                  </p>
                  {data.isPayed ? (
                    <Message variant="success">
                      payed on : {data.payedAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Payed</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  {!loadingProducts &&
                    data.cartItems.map((x) => {
                      const product = products.filter(
                        (y) => y._id === x.product_id
                      );

                      return (
                        <Row key={x._id}>
                          <Col md={3} className="">
                            <Image src={product[0].image} width={"100px"} />
                          </Col>

                          <Col md={5}>
                            <Link to={`/product/${x.product_id}`}>
                              {x.name}{" "}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {x.price} X {x.qnty}={x.price * x.qnty}
                          </Col>
                        </Row>
                      );
                    })}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup>
                  <ListGroupItem>
                    <h2>Order Summary</h2>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col md={6}>items :</Col>
                      <Col md={6}>$ {data.itemsPrice}</Col>
                    </Row>{" "}
                    <Row>
                      <Col md={6}>Shipping</Col>
                      <Col md={6}>$ {data.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Tax</Col>
                      <Col md={6}>$ {data.taxPrice}</Col>
                    </Row>{" "}
                    <Row>
                      <Col md={6}>Total</Col>
                      <Col md={6}>$ {data.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    {!loadingDeliver &&
                      user.isAdmin &&
                      data.isPayed &&
                      !data.isDelivered && (
                        <Button
                          className="btn btn-block"
                          onClick={onClickHandler}
                        >
                          Mark As Delivered
                        </Button>
                      )}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
