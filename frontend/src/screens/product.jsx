import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../slices/productSlice";

import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Rating from "../component/Rating";
import { errorAlert, successAlert } from "../component/alert";
import Loader from "../component/loader";
import { addToCart } from "../slices/cartslice";
import { useCreateReviewMutation } from "../slices/productSlice";

const Product = () => {
  const style = {
    height: " 36em",
    padding: "8px",
  };
  const style2 = {
    border: "2px solid black",
  };
  const { user } = useSelector((state) => state.userCredentials);
  const { id } = useParams();
  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewMutation();
  const [qnty, setQnty] = useState(1);
  const [review, setReview] = useState({
    rating: 1,
    comment: "",
    name: "",
  });
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);
  const cartHandler = (item) => {
    dispatch(addToCart({ ...item, qnty }));
    // navigate("/");
  };
  const onChangeHanlder = (ev) => {
    const { name, value } = ev.target;
    setReview((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const res = await createReview({
        review: {
          rating: review.rating,
          comment: review.comment,
          name: user.name,
        },
        id,
      }).unwrap();
      successAlert(res);
      setReview({
        rating: 1,
        comment: "",
        name: "",
      });
      refetch();
    } catch (err) {
      errorAlert(err?.data?.message || err?.error);
    }
  };
  return (
    <>
      <Container>
        <div className="row">
          <Col md={2}>
            <Link className="btn btn-dark my-3" to="/">
              Go Back
            </Link>
          </Col>
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          error?.data?.messege || error?.error
        ) : (
          <>
            {" "}
            <div className="row ">
              <div className="col-4">
                <ListGroup>
                  <Image src={`${product.image}`} alt={product.name} />
                </ListGroup>{" "}
              </div>
              <div className="col-5">
                <ListGroup>
                  <ListGroupItem>
                    <h3>{product.name}</h3>
                  </ListGroupItem>{" "}
                  <ListGroupItem>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroupItem>{" "}
                  <ListGroupItem>
                    <p>price:${product.price}</p>
                  </ListGroupItem>{" "}
                  <ListGroupItem>
                    <p>{product.description}</p>
                  </ListGroupItem>
                </ListGroup>
              </div>
              <div className="col-3">
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>price :</Col>
                      <Col>{product.price}</Col>
                    </Row>
                  </ListGroupItem>{" "}
                  <ListGroupItem>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product.countInStock > 0 ? "In-Stock" : "not In-Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>count :</Col>
                        <Col>
                          <Form.Select
                            aria-label="Default select example"
                            onClick={(e) => setQnty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      disabled={product.countInStock === 0}
                      onClick={() => {
                        successAlert(`${product.name} added to cart`);
                        return cartHandler(product);
                      }}
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 my-4">
                <h4>Comments section</h4>
                {user ? (
                  <>
                    {!reviewLoading ? (
                      <Form onSubmit={onSubmitHandler}>
                        <Form.Select
                          className="mb-3"
                          size="lg"
                          name="rating"
                          onChange={onChangeHanlder}
                        >
                          <option value="1">One 😡</option>
                          <option value="2">Two 😒</option>
                          <option value="3">Three 😐</option>
                          <option value="4">four 😊</option>
                          <option value="5">five 😃</option>
                        </Form.Select>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>write comments</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="comment"
                            value={review.comment}
                            onChange={onChangeHanlder}
                          />
                        </Form.Group>
                        <Button
                          type="submit"
                          className="btn btn-block ctn-light"
                          onClick={onSubmitHandler}
                        >
                          Post
                        </Button>
                      </Form>
                    ) : (
                      <Loader />
                    )}
                  </>
                ) : (
                  <Message variant={"danger"}>
                    Please{" "}
                    <Link to={`/signIn?redirect=product/${id}`}>SignIn</Link> to
                    Submit Reviews
                  </Message>
                )}
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-10 overflow-auto d-inline-block"
                style={style}
              >
                {product.review.length > 0 &&
                  product.review.map((x) => (
                    <div className="m-2 p-2" style={style2}>
                      <div className="d-flex">
                        <h3>{x.name}</h3>
                        <p className="ms-2">{x.createdAt.substring(0, 10)}</p>
                      </div>
                      <Rating value={x.rating} text={``} />
                      <p>{x.comment}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Product;
