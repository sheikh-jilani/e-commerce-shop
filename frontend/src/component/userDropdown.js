import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/authSlice";
import { logout } from "../slices/userCredentialSlice";
import { errorAlert, successAlert } from "./alert";
function VariantsExample({ user }) {
  const variant = "Info";
  const STYLE = {
    color: "white",
    border: "2px black",
  };
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      const res = await logoutMutation().unwrap();
      console.log(res);

      dispatch(logout());
      successAlert("successfully logged out");
    } catch (error) {
      errorAlert(error);
      console.log("error");
    }
  };
  return (
    <DropdownButton
      key={variant}
      id={`dropdown-variants-${variant}`}
      // variant={variant.toLowerCase()}
      title={user.name}
    >
      <LinkContainer to={"profile"} style={STYLE}>
        <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
      </LinkContainer>
      <Dropdown.Item eventKey="2" style={STYLE} onClick={logoutHandler}>
        Logout
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default VariantsExample;
