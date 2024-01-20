import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart3 } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../assets/logo.png";
import AdminDropdown from "./AdminDropdown";
import Search from "./Search";
import UserDropdown from "./userDropdown";

function Navbar2() {
  const { cartItems } = useSelector((STATE) => STATE.cart);
  const { user } = useSelector((STATE) => STATE.userCredentials);

  return (
    <Navbar
      expand="md"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>
            <img src={Logo} alt="brand" />
            ProShop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Search />
            <LinkContainer to={"/"}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to={"cart"}>
              <Nav.Link>
                <BsCart3 />
                Cart
                {cartItems.length > 0 && (
                  <Badge bg="info">{cartItems.length}</Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {user ? (
              <Nav.Link>
                <UserDropdown user={user} />
              </Nav.Link>
            ) : (
              <LinkContainer to={"signIn"}>
                <Nav.Link>
                  <FcBusinessman />
                  SignIn
                </Nav.Link>
              </LinkContainer>
            )}

            <Nav.Link>
              {user && user.isAdmin && <AdminDropdown user={user} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
