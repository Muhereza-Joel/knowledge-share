import React, { useState, useEffect, memo } from "react";
import { Modal, Button, Form, FloatingLabel, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import PopularTag from "./popularTag";

const Tags = (props) => {
  const [tagsData, setTagsData] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newTag, setNewTag] = useState({ name: "", description: "" });

  const [successMessage, setSuccessMessage] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTag((prevTag) => ({ ...prevTag, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const handleAddTag = async () => {
    try {
      // Validate form fields
      if (!newTag.name || !newTag.description) {
        setValidationError("All fields are required.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/tags/add-tag/", {
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

      const data = await response.json();
      setTagsData([...tagsData, data]);
      toast.success("Tag added successfully!", { style: { backgroundColor: "#cce6e8", color: "#333" } });
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setValidationError(null); // Reset validation errors when the modal is opened
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage(""); // Reset success message when the modal is closed
    newTag.name = "";
    newTag.description = "";
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/tags/popular-tags/"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTagsData(data);
        setFilteredTags(data); // Initialize filteredTags with all tags
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    // Filter tags based on the search term
    const filtered = tagsData.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchTerm, tagsData]);


 
  return (
    <div>
      <div id="content-section">
        <div
          id="middle-panel"
          className="card p-2 m-2"
          style={{ minHeight: "90vh" }}
        >
          <div className="d-flex mb-3">
            <div className="pt-2 h5 m-2 mx-3">All Tags</div>
            <div className="w-75 pt-2" id="search">
              <Form.Control
                  type="text"
                  style={{backgroundColor: "#f6f9ff", border: "2px solid #cce6e8"}}
                  placeholder="Search by tag name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
            </div>
            <div className="mx-3 text-end pt-2">
              <Button
               style={{backgroundColor: "#cce6e8", border: "6px solid #e0f8ff"}}
                className="btn btn-secondary btn-sm text-dark fw-bold"
                onClick={handleShowModal}
              >
                Add New Tag
              </Button>
            </div>
          </div>

          <div className="row g-0">
          {filteredTags.map((tag, index) => (
              <div className="col-lg-3" key={tag.id}>
                <div className="card p-3 m-2">
                  <PopularTag
                    key={tag.id}
                    id={tag.id}
                    title={tag.name}
                    description={tag.description}
                    username={props.username}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Modal show={showModal} onHide={handleCloseModal} >
       
        <Modal.Body style={{backgroundColor: "#f6f9ff"}}>
          {validationError && (
            <Alert variant="danger" className="p-1">
              {validationError}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-0" controlId="tagName">
              <Form.Label>Tag Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag name"
                name="name"
                value={newTag.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-0" controlId="tagDescription">
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
          </Form>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#f6f9ff"}}>
          <Button
            className="btn-sm"
            variant="danger"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button style={{backgroundColor: "#cce6e8", border: "3px solid #299ea6"}} className="btn-sm text-dark" variant="primary" onClick={handleAddTag}>
            Save Tag Info
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(Tags);
