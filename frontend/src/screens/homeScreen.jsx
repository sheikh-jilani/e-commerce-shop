import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Pagination from "../component/Pagination";
import Loader from "../component/loader";
import Products from "../component/products";
import { useGetProductsQuery } from "../slices/productSlice";

const HomeScreen = () => {
  const { pageNum, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNum, keyword });
  return (
    <>
      <Container>
        <h1>Latest products</h1>
        <div className="grid">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <h3>{error?.data?.messege || error?.error}</h3>
          ) : (
            data.products.map((product) => (
              <Products product={product} key={product._id} />
            ))
          )}
        </div>

        {!isLoading && (
          <Pagination
            page={data.pageCount}
            pageNum={pageNum}
            keyword={keyword}
          />
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
