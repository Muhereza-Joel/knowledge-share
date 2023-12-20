import React, { useState, useEffect } from "react";
import { Nav, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const PopularTag = ({
  id,
  title,
  description,
  username,
  onDelete,
  showIcons = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showIconsState, setShowIconsState] = useState(showIcons);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    console.log("Edit icon clicked for tag:", id);
  };

  const handleView = () => {
    console.log("View icon clicked for tag:", id);
  };

  const handleDelete = () => {
    onDelete(id);
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
            <Nav.Item>
              <Nav.Link href={`/knowledge-share/${username}/tags/${id}`}>
                <span
                  className="fw-bold"
                  style={{
                    textDecoration: isHovered ? "underline" : "none",
                    transition: "border 0.3s ease",
                  }}
                >
                  {truncateText(title, 15)}
                </span>
              </Nav.Link>
            </Nav.Item>
            <p className="text-secondary">{truncateText(description, 50)}</p>
          </div>
        </div>
      </div>

      {isHovered && showIconsState && (
        <div
          className="position-absolute top-75 start-75 translate-end"
          style={{ backgroundColor: "#f6f9ff", border: "4px solid #cce6e8" }}
        >
          <i
            className="bi bi-pencil mx-2 text-primary"
            onClick={handleEdit}
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className="bi bi-eye mx-2 text-success"
            onClick={handleView}
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className="bi bi-trash mx-2 text-danger"
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      )}
    </div>
  );
};

export default PopularTag;
