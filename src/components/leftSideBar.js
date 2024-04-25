import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from 'js-cookie';

const LeftSideBar = (props) => {
  const storedActiveLink = localStorage.getItem("activeLink") || "ask-question";
  const [activeLink, setActiveLink] = useState(storedActiveLink);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const panelStyle = {
    minHeight: "90vh",
  };

  const leftPanelStyle = {
    ...panelStyle,
    position: "sticky !important",
    top: 60,
  };

  const linkStyle = {
    backgroundColor: "#fff",
    borderRadius: "0px 50px 50px 0px",
    boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.1)",
    padding: "13px 0 13px 0",
  };

  return (
    <div>
      <div className="d-flex flex-column pe-4 mt-2" style={leftPanelStyle}>
        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "ask-question" ? "active" : ""
          }`}
          style={activeLink === "ask-question" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/questions/ask-question/`}
            className="text-info px-3 fw-bold text-dark"
            onClick={() => setActiveLink("ask-question")}
          >
            Ask Question
          </Nav.Link>
        </Nav.Item>

        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "all-questions" ? "active" : ""
          }`}
          style={activeLink === "all-questions" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/questions/`}
            className="text-info px-3 fw-bold text-dark"
            onClick={() => setActiveLink("all-questions")}
          >
            All Questions
          </Nav.Link>
        </Nav.Item>

        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "calender" ? "active" : ""
          }`}
          style={activeLink === "calender" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/calendar/`}
            className="text-info px-3 fw-bold text-dark"
            onClick={() => setActiveLink("calender")}
          >
            My Calendar
          </Nav.Link>
        </Nav.Item>

        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "tags" ? "active" : ""
          }`}
          style={activeLink === "tags" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/tags/`}
            className="text-info px-3 fw-bold text-dark"
            onClick={() => setActiveLink("tags")}
          >
            Tags
          </Nav.Link>
        </Nav.Item>

      </div>
    </div>
  );
};

export default LeftSideBar;
