import React, { useState, useEffect } from "react";
import { Nav, Modal, Button, Form, Alert, ModalBody } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const PopularTag = ({
  id,
  title,
  description,
  username,
  onDelete,
  onUpdate,
  showIcons = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showIconsState, setShowIconsState] = useState(showIcons);

  const [showViewModel, setShowViewModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [showConfirmDeleteModel, setShowConfirmDeleteModel] = useState(false);
  const [tagDetails, setTagDetails] = useState({
    id: id,
    title: title,
    description: description,
  });

  const [newTag, setNewTag] = useState({
    id: id,
    title: title,
    description: description,
  });
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    handleShowEditModel(true, { id, title, description });
  };

  const handleShowEditModel = (showModel, tagDetails) => {
    setShowEditModel(showModel);
    setTagDetails(tagDetails);
    setNewTag(tagDetails);
  };

  const handleCloseEditModel = () => {
    setShowEditModel(false);
    setIsHovered(false);
    setTagDetails({});
    setNewTag({});
    setValidationError(null);
  };

  const handleView = () => {
    handleShowViewModel(true, { title, description });
  };

  const handleShowViewModel = (showModel, tagDetails) => {
    setShowViewModel(showModel);
    setTagDetails(tagDetails);
  };

  const handleCloseViewModel = () => {
    setShowViewModel(false);
    setIsHovered(false);
    setTagDetails({});
  };

  const handleDelete = () => {
    handleShowConfirmDeleteModel(true, { id, title, description });
  };

  const handleShowConfirmDeleteModel = (showModel, tagDetails) => {
    setShowConfirmDeleteModel(showModel);
    setTagDetails(tagDetails);
  };

  const handleCloseConfirmDeleteModel = () => {
    setShowConfirmDeleteModel(false);
    setIsHovered(false);
    setTagDetails({});
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTag((prevTag) => ({ ...prevTag, [name]: value }));
  };

  const handleDeleteTag = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/tags/delete-tag/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagDetails),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      onDelete(data.id);
      toast.success("Tag Deleted successfully!", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });

      handleCloseConfirmDeleteModel();
    } catch (error) {
      setError(error.message);
    }
  }

  const handleUpdateTag = async () => {
    try {
      // Validate form fields
      if (!newTag.title || !newTag.description) {
        setValidationError("All fields are required.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/v1/tags/edit-tag/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTag),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newTagData = await response.json();
      onUpdate(newTagData);
      toast.success("Tag Details Updated successfully!", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });

      handleCloseEditModel();
    } catch (error) {
      setError(error.message);
    }
  };

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
            <p className="text-secondary">{truncateText(description, 60)}</p>
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
      {/* Start View Tag Details Model */}
      <Modal show={showViewModel} onHide={handleCloseViewModel}>
        <Modal.Body
          style={{
            backgroundColor: "#f6f9ff",
            borderRadius: "5px",
            border: "5px solid #cce6e8",
          }}
        >
          <small className="text-secondary">Title</small>
          <h4>{tagDetails.title}</h4>
          <hr></hr>
          <small className="text-secondary">Description</small>
          <p className="mt-1">{tagDetails.description}</p>

          <div className="text-end">
            <Button
              className="btn-sm"
              variant="secondary"
              onClick={handleCloseViewModel}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* End View Tag Details Model */}

      {/* Start Edit Tag Details Model */}
      <Modal show={showEditModel} onHide={handleCloseEditModel}>
        <Modal.Body
          style={{
            backgroundColor: "#f6f9ff",
            borderRadius: "5px",
            border: "5px solid #cce6e8",
          }}
        >
          {validationError && (
            <Alert variant="danger" className="p-1">
              {validationError}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-0" controlId="editTagName">
              <Form.Control
                type="hidden"
                placeholder="Enter tag name"
                name="tagId"
                value={newTag.id}
              />
              <Form.Label>Tag Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag name"
                name="title"
                value={newTag.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-0" controlId="editTagDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter tag description"
                name="description"
                value={newTag.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="text-end mt-3">
              <Button
                className="btn-sm mx-2"
                variant="secondary"
                onClick={handleCloseEditModel}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#cce6e8",
                  border: "3px solid #299ea6",
                }}
                className="btn-sm text-dark"
                variant="primary"
                onClick={handleUpdateTag}
              >
                Update Tag Info
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* End Edit Tag Details Model */}

      {/* Start Confirm Delete Model */}
      <Modal show={showConfirmDeleteModel} onHide={handleCloseConfirmDeleteModel}>
        <Modal.Body
          style={{
            backgroundColor: "#f6f9ff",
            borderRadius: "5px",
            border: "5px solid #cce6e8",
          }}
        >
          <h5 className="text-secondary">Are you sure you want to delete this tag?</h5>
          <hr></hr>
          <small className="text-warning">Caution:</small>
          <p className="mt-1">Deleting this tag will also delete all data associated with this tag. Note that this action is undoable..</p>

          <div className="text-end">
            <Button
              className="btn-sm"
              variant="secondary"
              onClick={handleCloseConfirmDeleteModel}
            >
              Close
            </Button>

            <Button
              className="btn-sm ms-2"
              variant="danger"
              onClick={handleDeleteTag}
            >
              Yes, Delete Tag.
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* End Confirm Delete Model */}
    </div>
  );
};

export default PopularTag;
