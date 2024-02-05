import { Menu, Container, Button, Image } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/react.svg";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Menu
      inverted
      borderless
      style={{ padding: "0.3rem", marginBottom: "20px" }}
      attached
    >
      <Container>
        <Menu.Item name="home">
          <Link to="/">
            <Image size="mini" src={logo} alt="CRUD Logo" />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">
            <h2>FIREBASE CRUD APP</h2>
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Button size="mini" primary onClick={() => navigate("/add")}>
            Add User
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
