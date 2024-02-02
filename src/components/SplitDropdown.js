import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Nav } from "react-bootstrap";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

const SplitDropdown = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/logout");
  };

  const handleNavigatioToHome = () => {
    navigate(`/knowledge-share/${props.username}/`);
  }
  return (
    <Dropdown as={ButtonGroup}>
      <Button
        variant="secondary"
        style={{ backgroundColor: "#cce6e8", border: "none", color: "black" }}
        className="btn-sm fw-bold"
      >
        {props.username}
      </Button>

      <Dropdown.Toggle
        split
        variant="secondary"
        style={{ backgroundColor: "#ace6e8", border: "none", color: "black" }}
        id="dropdown-split-basic"
      />

      <Dropdown.Menu>
        <Dropdown.Item>
          <Nav.Item>
            <Nav.Link
              href={`/knowledge-share/${props.username}/`}
              className="text-info px-2 fw-bold text-dark"
              onClick={handleNavigatioToHome}
            >
              {props.username}
            </Nav.Link>
          </Nav.Item>
        </Dropdown.Item>
        <Dropdown.Item>
          <h6
            className="mx-2"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </h6>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SplitDropdown;
