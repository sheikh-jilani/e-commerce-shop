import React from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname.split("/");
  const [Search, setSearch] = React.useState();
  const onSearchHandler = async (ev) => {
    ev.preventDefault();
    if (Search) {
      pathName[1] === "productList"
        ? navigate(`productList/${Search}/page/1`)
        : navigate(`keyword/${Search}/page/1`);
    }
  };
  return (
    <>
      <Form onSubmit={onSearchHandler}>
        <Form.Group
          className="mb-3 me-3 d-flex"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            className="me-1"
            type="text"
            placeholder="name it"
            name="name"
            value={Search}
            onChange={(ev) => setSearch(ev.target.value)}
          />{" "}
          <Button
            type="submit"
            className="btn btn-block btn-light"
            onSubmit={(ev) => onSearchHandler(ev)}
          >
            Search
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Search;
