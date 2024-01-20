import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { LinkContainer } from "react-router-bootstrap";

function VariantsExample({ user }) {
  const variant = "Info";
  const STYLE = {
    color: "white",
    border: "2px black",
  };

  return (
    <DropdownButton
      key={variant}
      id={`dropdown-variants-${variant}`}
      //   variant={variant.toLowerCase()}
      title="Admin"
    >
      <LinkContainer to={"productList"} style={STYLE}>
        <Dropdown.Item eventKey="1">Products List</Dropdown.Item>
      </LinkContainer>
      <LinkContainer to={"users"} style={STYLE}>
        <Dropdown.Item eventKey="2">Users</Dropdown.Item>
      </LinkContainer>
      <LinkContainer to={"orderList"} style={STYLE}>
        <Dropdown.Item eventKey="3">Orders List</Dropdown.Item>
      </LinkContainer>
    </DropdownButton>
  );
}

export default VariantsExample;
