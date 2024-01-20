import CheckedStep from "../component/checkedStep";
import {
  Card,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/loader";
import { Link, useNavigate } from "react-router-dom";
import Message from "../component/Message";
import { useCreateOrderMutation } from "../slices/orderSlice";
import { errorAlert } from "../component/alert";
import { clearCartItems } from "../slices/cartslice";
const OrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const {
    shippingAddress,
    price,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    cartItems,
  } = cart;
  const [order, { isLoading, error }] = useCreateOrderMutation();

  const onClickHandler = async () => {
    try {
      const res = await order(cart).unwrap();
      navigate(`/orders/${res._id}`);
      dispatch(clearCartItems());
    } catch (err) {
      errorAlert(err?.data.message || err?.message);
    }
  };
  return (
    <Container>
      <CheckedStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shopping</h2>
              <p>
                <strong>Address : </strong>
                {shippingAddress.address} , {shippingAddress.city}
                {"  "} {shippingAddress.postalCode} , {shippingAddress.country}
              </p>
            </ListGroupItem>{" "}
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message variant>
                  Cart is empty...<Link to="/">Go Shopping</Link>
                </Message>
              ) : (
                cartItems.map((item, index) => (
                  <Row key={index} className="py-1">
                    <Col md={2}>
                      <Image
                        style={{ width: "110px" }}
                        src={item.image}
                        alt={item.name}
                      />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col>
                      {item.price} X {item.qnty} = {item.qnty * item.price}
                    </Col>
                  </Row>
                ))
              )}
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
                  {" "}
                  <Col>
                    <strong>Price :</strong>
                  </Col>
                  <Col> {price}$</Col>
                </Row>
              </ListGroupItem>{" "}
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Shipping :</strong>
                  </Col>
                  <Col>{shippingPrice}$</Col>
                </Row>
              </ListGroupItem>{" "}
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Tax :</strong>
                  </Col>
                  <Col>{taxPrice}$</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  {" "}
                  <Col>
                    <strong>total :</strong>
                  </Col>
                  <Col> {totalPrice}$</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem></ListGroupItem>
              <ListGroupItem>
                <Button className="btn btn-block" onClick={onClickHandler}>
                  {isLoading ? <Loader /> : "place order"}
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
