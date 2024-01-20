import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { MdDeleteForever, MdOutlineAddToPhotos } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../component/Message";
import Pagination from "../../component/Pagination";
import { errorAlert, successAlert } from "../../component/alert";
import Loader from "../../component/loader";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productSlice";
const OrderListScreen = () => {
  const STYLE = {
    fontSize: " 1.8em",
    color: "red",
  };
  // console.log(useNavigate().location);
  const { pageNum, keyword } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNum,
    keyword,
  });
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();
  const onDeletehandler = async (id) => {
    try {
      const res = await deleteProduct(id).unwrap();
      successAlert(`successfully deleted ${res.name}`);
      refetch();
    } catch (err) {
      errorAlert(err?.data?.message || err?.error);
    }
  };

  const onCreateProduct = async () => {
    try {
      const res = await createProduct().unwrap();
      successAlert(`product created successfully with an id of ${res}`);
      refetch();
    } catch (err) {
      errorAlert(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      <Container>
        <Button
          className="btn btn-block btn-light"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Row className="my-2">
          <Col md={6}>
            {" "}
            <h3>Product List</h3>
          </Col>
          <Col md={6} className=" d-flex flex-row-reverse">
            {!createLoading ? (
              <Button className="btn btn-block dark" onClick={onCreateProduct}>
                <MdOutlineAddToPhotos /> Create Product
              </Button>
            ) : (
              <Loader />
            )}
          </Col>
        </Row>
        <Row>
          <Table striped hover responsive>
            <thead>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant={"danger"}>
                  {error?.data?.massage || error?.error}
                </Message>
              ) : (
                data.products.toReversed().map((product) => (
                  <tr>
                    <td>{product._id}</td>
                    <td>
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </td>
                    <td>{product.price} $</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/product/update/${product._id}`}>
                        <TbEdit style={{ fontSize: " 1.8em" }} />
                      </LinkContainer>
                    </td>
                    <td>
                      {loadingDelete ? (
                        <Loader />
                      ) : (
                        <MdDeleteForever
                          style={STYLE}
                          onClick={() => onDeletehandler(product._id)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Row>
        {!isLoading && (
          <Pagination
            isAdmin={true}
            keyword={keyword}
            page={data.pageCount}
            pageNum={pageNum}
          />
        )}
      </Container>
    </>
  );
};

export default OrderListScreen;
