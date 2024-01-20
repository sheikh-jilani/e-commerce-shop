import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../../component/formContainer";

import { useNavigate, useParams } from "react-router-dom";
import { errorAlert, successAlert } from "../../component/alert";
import Loader from "../../component/loader";
import {
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../slices/productSlice";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();
  const [productDetail, setProductDetail] = useState({
    countInStock: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image: "",
    name: "",
  });
  const { countInStock, price, description, category, brand, image, name } =
    productDetail;
  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setProductDetail((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const res = await updateProduct({ ...productDetail, _id: id }).unwrap();
      successAlert(`successfully update product ${res}`);
      navigate(`/product/${res}`);
    } catch (error) {
      console.log(error);
      errorAlert(error?.data?.message || error?.error);
    }
  };

  const uploadFileHandler = async (ev) => {
    try {
      console.log(ev.target.files[0]); //files array.

      const formData = new FormData();
      formData.append("image", ev.target.files[0]); //a custom form data

      const res = await uploadImage(formData).unwrap(); //upload image mutation
      console.log(res);
      successAlert(res.message);
      setProductDetail((pre) => ({
        ...pre,
        image: `${res.image}`,
      }));
    } catch (error) {
      errorAlert(error?.data?.message || error?.error);
    }
  };
  return (
    <>
      <FormContainer>
        <h3>Update Product Details</h3>
        <Form onSubmit={onSubmitHandler} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name of Product</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="name"
              value={name}
              placeholder="name of the product"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Brand">
            <Form.Label>Brand name</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="brand"
              value={brand}
              placeholder="Name of the Brand"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>category</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="category"
              value={category}
              placeholder="Category"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="Number"
              name="price"
              value={price}
              placeholder="Price of the product"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock in count</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="Number"
              name="countInStock"
              value={countInStock}
              placeholder="Stock in count"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>upload picture</Form.Label>
            {loadingUpload ? (
              <Loader />
            ) : (
              <Form.Control onChange={uploadFileHandler} type="file" />
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              as="textarea"
              name="description"
              value={description}
              rows={3}
            />
          </Form.Group>
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              className="btn btn-block dark"
              type="submit"
              onSubmit={onSubmitHandler}
            >
              update
            </Button>
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default UpdateProduct;
