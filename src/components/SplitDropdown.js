import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Nav } from "react-bootstrap";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";
import Avatar from "../assets/images/avator.jpg";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "./../redux/actions/actions";

const SplitDropdown = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { avator, username} = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    dispatch(resetStore());
    navigate("/logout");
  };

  const navigateToProfile = () => {
    navigate(`/knowledge-share/${username}/profile/`);
  };

  const handleNavigatioToHome = () => {
    navigate(`/knowledge-share/${username}/`);
  };

  const avatorStyle = {
    width: "30px",
    height: "30px",
    marginRight: "5px",
  };

  return (
    <Dropdown as={ButtonGroup} show={isDropdownOpen} onClick={toggleDropdown}>
      <Button
        variant="secondary"
        style={{
          backgroundColor: "#28a745",
          border: "none",
          color: "white",
          marginTop: "-10px",
        }}
        className="btn-sm fw-bold"
      >
        <img
          src={avator || Avatar}
          className="rounded-circle"
          style={avatorStyle}
        />
        {username}
      </Button>

      <Dropdown.Toggle
        split
        variant="secondary"
        style={{
          backgroundColor: "#217537",
          border: "none",
          color: "white",
          marginTop: "-10px",
        }}
        id="dropdown-split-basic"
      />

      <Dropdown.Menu>
        <Dropdown.Item>
          <Nav.Item>
            <Nav.Link
              className="text-info px-2 fw-bold text-dark"
              onClick={handleNavigatioToHome}
            >
              Your Dashboard
            </Nav.Link>
          </Nav.Item>
        </Dropdown.Item>

        <Dropdown.Item>
          <h6
            className="mx-2"
            onClick={navigateToProfile}
            style={{ cursor: "pointer" }}
          >
            Your Profile
          </h6>
        </Dropdown.Item>

        <Dropdown.Item>
          <h6 className="mx-2" style={{ cursor: "pointer" }}>
            Your Notifications
          </h6>
        </Dropdown.Item>

        <Dropdown.Item>
          <h6 className="mx-2" style={{ cursor: "pointer" }}>
            Account Settings
          </h6>
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
