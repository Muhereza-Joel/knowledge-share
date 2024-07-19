// Tags.js
import React, { useEffect, memo } from "react";
import { Modal, Button, Form, Alert, Placeholder } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import PopularTag from "./popularTag";
import LeftSideBar from "./leftSideBar";
import TopBar from "./topBar";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import API_BASE_URL from "./appConfig";

import {
  fetchTags,
  setFilteredTags,
  setSearchTerm,
  setNewTag,
  setShowModal,
  setValidationError,
  setTagsData,
  setError,
  setSuccessMessage,
} from "../redux/reducers/tagsSlice";

const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

const Tags = (props) => {
  const dispatch = useDispatch();
  const {
    tagsData,
    filteredTags,
    searchTerm,
    newTag,
    showModal,
    validationError,
    error,
    loading,
  } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewTag({ ...newTag, [name]: value }));
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleAddTag = async () => {
    try {
      if (!newTag.name || !newTag.description) {
        dispatch(setValidationError("All fields are required."));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/tags/add-tag/`, {
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
      dispatch(setTagsData([...tagsData, data]));
      dispatch(setFilteredTags([...filteredTags, data]));
      toast.success("Tag added successfully!", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
      handleCloseModal();
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleUpdate = (newTagData) => {
    const index = tagsData.findIndex((tag) => tag.id === newTagData.id);

    dispatch(
      setTagsData([
        ...tagsData.slice(0, index),
        newTagData,
        ...tagsData.slice(index + 1),
      ])
    );
  };

  const handleDeleteTag = (tagId) => {
    const updatedTags = tagsData.filter((tag) => tag.id !== tagId);
    dispatch(setTagsData(updatedTags));
  };

  const handleShowModal = () => {
    dispatch(setShowModal(true));
    dispatch(setValidationError(null));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
    dispatch(setSuccessMessage(""));
    dispatch(setNewTag({ name: "", description: "" }));
  };

  useEffect(() => {
    const filtered = tagsData.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setFilteredTags(filtered));
  }, [searchTerm, tagsData, dispatch]);

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
      <div className="row g-0">
        <TopBar username={props.username} />
        <div className="col-sm-2">
          <div style={{ position: "fixed", top: "50px", width: "18%" }}>
            <LeftSideBar username={props.username} />
          </div>
        </div>
        <div className="col-sm-10">
          <div>
            <div id="content-section">
              <div
                id="middle-panel"
                className="p-2 m-2"
                style={{ minHeight: "90vh" }}
              >
                <div className="d-flex mb-3">
                  <div className="pt-2 h5 m-2 mx-3">All Tags</div>
                  <div className="w-75 pt-2" id="search">
                    <Form.Control
                      type="text"
                      style={{
                        backgroundColor: "#f6f9ff",
                        border: "2px solid #cce6e8",
                      }}
                      placeholder="Search by tag name"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="mx-3 text-end pt-2">
                    {cookieData.USERROLE_KEY === "admin" && (
                      <Button
                        style={{
                          backgroundColor: "#cce6e8",
                          border: "6px solid #e0f8ff",
                        }}
                        className="btn btn-secondary btn-sm text-dark fw-bold"
                        onClick={handleShowModal}
                      >
                        Add New Tag
                      </Button>
                    )}
                  </div>
                </div>

                <div className="row g-0">
                  {loading
                    ? Array(20)
                        .fill()
                        .map((_, index) => (
                          <div className="col-lg-3" key={index}>
                            <div className="card p-3 m-2">
                              <Placeholder animation="glow">
                                <Placeholder
                                  className="my-2"
                                  style={{ backgroundColor: "#d5e0eb" }}
                                  xs={12}
                                />
                                <Placeholder
                                  className="my-2"
                                  style={{ backgroundColor: "#d5e0eb" }}
                                  xs={10}
                                />
                                <Placeholder
                                  className="my-2"
                                  style={{ backgroundColor: "#d5e0eb" }}
                                  xs={4}
                                />
                              </Placeholder>
                            </div>
                          </div>
                        ))
                    : filteredTags.map((tag, index) => (
                        <div className="col-lg-3" key={tag.id}>
                          <div className="card p-3 m-1">
                            <PopularTag
                              key={tag.id}
                              id={tag.id}
                              title={tag.name}
                              description={tag.description}
                              username={props.username}
                              onUpdate={handleUpdate}
                              onDelete={handleDeleteTag}
                            />
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* Toast container */}
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <Modal show={showModal} onHide={handleCloseModal}>
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
                  <div className="text-end mt-3">
                    <Button
                      className="btn-sm mx-2"
                      variant="secondary"
                      onClick={handleCloseModal}
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
                      onClick={handleAddTag}
                    >
                      Save Tag Info
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Tags);
