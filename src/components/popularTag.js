import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const PopularTag = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const letterStyle = {
    width: 50,
    height: 50,
    border: `4px solid ${isHovered ? "#299ea6" : "transparent"}`,
    backgroundColor: "#cce6e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "border 0.3s ease",
  };

  const containerStyle = {
    border: "1px solid transparent",
    transition: "border 0.3s ease",
  };

  useEffect(() => {
    // Effect to clean up the border color on component unmount
    return () => setIsHovered(false);
  }, []);

  return (
    <div
      className="mb-0 mx-2"
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="row">
        <div className="col-sm-2">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div
              className="h4 p-2 m-1 text-dark rounded-circle text-center"
              style={letterStyle}
            >
              {title.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        <div className="col-sm-10">
          <div className="d-flex flex-column">
            <span className="fw-bold">{truncateText(title, 15)}</span>
            <p className="text-secondary">{truncateText(description, 50)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularTag;
