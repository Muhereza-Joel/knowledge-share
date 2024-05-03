import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import Cookies from 'js-cookie';

const Tag = ({ text, tagId, username }) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Clean up the hover state when unmounting
    return () => setIsHovered(false);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Nav.Item>
        <Nav.Link href={`/knowledge-share/${cookieData.USERNAME_KEY}/tags/${tagId}`}>
          <span
            className="badge mx-1 text-dark"
            style={{
              border: "3px solid #217537",
              // backgroundColor: isHovered ? "#888" : "#217537",
              transition: "border 0.3s ease",
            }}
          >
            {text}
          </span>
        </Nav.Link>
      </Nav.Item>
    </div>
  );
};

export default Tag;
