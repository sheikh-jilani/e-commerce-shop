import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "./Rating";

const Products = ({ product }) => {
  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <LinkContainer to={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" alt="..." />
      </LinkContainer>
      <div className="card-body">
        <LinkContainer to={`/product/${product._id}`}>
          <h5 className="card-title">{product.name}</h5>
        </LinkContainer>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <p className="card-text">${product.price}</p>
      </div>
    </div>
  );
};

export default Products;
