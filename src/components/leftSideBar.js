import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const LeftSideBar = (props) => {
  const [isActive, setIsActive] = useState(true);

  const panelStyle = {
    minHeight: "90vh",
  };

  const leftPanelStyle = {
    ...panelStyle,
    position: "sticky",
    top: 60,
  };

  const activeStyle = {
    backgroundColor: "#fff",
    borderRadius: "0px 50px 50px 0px",
    boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.1)",
    padding: "13px 0 13px 0",
  };

  return (
    <div>
      <div className="d-flex flex-column pe-4 mt-2" style={leftPanelStyle}>
        <Nav.Item
          className="d-flex align-items-center mt-3"
          style={activeStyle}
        >
          <Nav.Link
            href={`/knowledge-share/${props.username}/questions/ask-question/`}
            className="text-info px-3 fw-bold text-dark"
          >
            Ask Question
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="d-flex align-items-center mt-3">
          <Nav.Link
            href={`/knowledge-share/${props.username}/questions/`}
            className="text-info px-3 fw-bold text-dark"
          >
            All Questions
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="d-flex align-items-center mt-3">
          <Nav.Link
            href={`/knowledge-share/${props.username}/tags/`}
            className="text-info px-3 fw-bold text-dark"
          >
            Tags
          </Nav.Link>
        </Nav.Item>
      </div>
    </div>
  );
};

export default LeftSideBar;
