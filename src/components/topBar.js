import React from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";

const TopBar = (props) => {
  const navigate = useNavigate();

  const topPaneStyle = {
    width: "98vw",
    height: "7vh",
    zIndex: "3",
    position: "sticky",
    top: 0,
    backgroundColor: "#f6f9ff",
  };

  const handleLogout = () => {
    // Call the logout function from auth.js
    logout();

    // Redirect to /auth/login/
    navigate("/auth/login");
  };


  return (
    <div className="row p-3 g-0" style={topPaneStyle}>
      
          <div className="w-25">
            <h5>
              <span className="text-success">Knowledge</span>Share
            </h5>
          </div>

          <div className="w-50 d-flex">
          

            <h6 className="mx-4"></h6>
            <h6 className="mx-2 ml-4">Notifications</h6>
            <h6 className="mx-2">Settings</h6>
            <h6 className="mx-2">Profile</h6>
          </div>

          <div className="w-25 text-end">
          <Nav.Item>
              <Nav.Link
                href={`/knowledge-share/${props.username}/`}
                className="text-info px-2 fw-bold text-dark"
              >
                {props.username}
              </Nav.Link>
            </Nav.Item>
          <h6
          className="mx-2"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Sign Out
          </h6>
          </div>
        
    </div>
  );
};

export default TopBar;
