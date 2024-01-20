import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";
const PaginationComponent = ({
  keyword = null,
  pageNum = 1,
  page,
  isAdmin = false,
}) => {
  return (
    <>
      {page > 1 && (
        <Pagination>
          {[...Array(page).keys()].map((x) => (
            <LinkContainer
              to={
                isAdmin && keyword
                  ? `/productList/${keyword}/page/${x + 1}`
                  : isAdmin
                  ? `/productList/page/${x + 1}`
                  : keyword
                  ? `/keyword/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
              }
            >
              <Pagination.Item key={x + 1} active={Number(pageNum) === x + 1}>
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default PaginationComponent;
