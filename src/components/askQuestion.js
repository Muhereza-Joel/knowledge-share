import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "bootstrap/dist/css/bootstrap.css";
import Tag from "./tag";
import debounce from "lodash/debounce";
import LeftSideBar from "./leftSideBar";
import TopBar from "./topBar";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";
import AskQuestionSVG from "./AskQuestonSVG";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestionTitle,
  setDescription,
  setSearchInput,
  setSelectedTags,
  setSelectedTagsData,
  setImages,
  fetchSuggestedTags,
  sendQuestionToSpacy,
  submitQuestion,
  clearSuccess,
  clearError,
} from "../redux/reducers/askQuestionSlice";

const AskQuestion = (props) => {
  const dispatch = useDispatch();
  const {
    isQuestionSubmitted,
    questionTitle,
    description,
    searchInput,
    suggestedTags,
    selectedTags,
    selectedTagsData,
    images,
    success,
    error,
    loading,
  } = useSelector((state) => state.askQuestion);

  // Debounce the fetchSuggestedTags function to avoid rapid API calls
  const debouncedFetch = debounce(
    () => dispatch(fetchSuggestedTags(searchInput)),
    1000
  );

  useEffect(() => {
    if (searchInput.length > 0) {
      debouncedFetch();
    }

    // Cleanup function to cancel debouncedFetch when component unmounts
    return () => {
      debouncedFetch.cancel();
    };
  }, [dispatch, searchInput, debouncedFetch]);

  const debouncedSendQuestionToSpacy = debounce(
    () => dispatch(sendQuestionToSpacy()),
    2000
  );

  const handleQuestionTitleChange = (value) => {
    dispatch(setQuestionTitle(value));
    debouncedSendQuestionToSpacy();
  };

  const handleDescriptionChange = (value) => {
    dispatch(setDescription(value));
    debouncedSendQuestionToSpacy();
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    dispatch(setSearchInput(inputValue));
  };

  const handleTagClick = (tag) => {
    const tagId = tag.id;

    if (selectedTags.includes(tagId)) {
      dispatch(
        setSelectedTags(
          selectedTags.filter((selectedTag) => selectedTag !== tagId)
        )
      );

      dispatch(
        setSelectedTagsData(
          selectedTagsData.filter((selectedTag) => selectedTag.id !== tagId)
        )
      );
    } else {
      dispatch(setSelectedTags([...selectedTags, tagId]));
      dispatch(setSelectedTagsData([...selectedTagsData, tag]));
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;

    // Limit to a maximum of six images
    if (images.length > 5 || files.length > 5) {
      alert("You can only upload up to five images.");
      return;
    }

    // Update the images state with the selected files
    dispatch(setImages([...images, ...Array.from(files)]));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    dispatch(setImages(updatedImages));
  };

  const quillEditorStyle = {
    height: "300px",
    marginBottom: "50px",
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isQuestionSubmitted) {
      alert("This question has already been submitted.");
      return;
    }

    // Check if required fields are filled
    if (!questionTitle || !description || selectedTags.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    debouncedSubmit();
  };

  //delay submission of question due to AI processing and image uploads
  const debouncedSubmit = debounce(
    () => dispatch(submitQuestion()),
    2000
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: { backgroundColor: "#ffc2c2", color: "#333" },
      });

      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success, {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });

      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-sm-2">
          <div style={{ position: "fixed", top: "50px", width: "18%" }}>
            <LeftSideBar username={props.username} />
          </div>
        </div>
        <div className="col-sm-10">
          <div className="mt-2 p-2">
            <div style={{ width: "100%", height: "100%" }}>
              <AskQuestionSVG />
            </div>

            <div className="my-2">
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group
                  className="mb-0 p-4 card"
                  controlId="questionDescription"
                >
                  <Form.Label className="h3 text-muted">
                    Compose Your Question
                  </Form.Label>

                  <Form.Control
                    value={questionTitle}
                    type="text"
                    className="my-3"
                    placeholder="Enter question title here"
                    name="question-title"
                    onChange={(e) => handleQuestionTitleChange(e.target.value)}
                    required
                  />

                  <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Describe your issue or challenge you are currently facing and later associate it with any tags..."
                    name="description"
                    style={quillEditorStyle}
                    required
                  />
                </Form.Group>
                <Form.Group className="p-4 card mt-2">
                  <Form.Label className="mt-2 mb-0 text-muted h4">
                    AI-Enhanced Tags
                  </Form.Label>
                  <small className="text-muted">
                    Our AI service analyzes your question to suggest the most
                    relevant tags, making your question more discoverable. Tags
                    also serve as keywords or labels that help categorize and
                    enhance the discoverability of questions, making it easier
                    for users to find relevant information.
                  </small>

                  {/* <Form.Control
                    className="mt-2 mb-3"
                    type="text"
                    placeholder="Type here to get tag suggestions..."
                    name="title"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  /> */}
                  {/* Display suggested tags below the search input */}

                  <div>
                    <div>
                      {searchInput.length > 0 && (
                        <div>
                          {suggestedTags.map((tag) => (
                            <span
                              key={tag.id}
                              className={`tag ${
                                selectedTags.includes(tag.id) ? "selected" : ""
                              }`}
                              onClick={() => handleTagClick(tag)}
                              style={{
                                backgroundColor: selectedTags.includes(tag.id)
                                  ? "#299ea6"
                                  : "#666",
                                color: selectedTags.includes(tag.id)
                                  ? "#fff"
                                  : "#fff",
                                border: selectedTags.includes(tag.id)
                                  ? "3px solid #299ea6"
                                  : "3px solid #299ea6",
                                margin: "0px 3px",
                                padding: "0px 3px",
                                borderRadius: "10px",
                              }}
                            >
                              <small>{tag.name}</small>
                            </span>
                          ))}

                          {selectedTags.length === 0 && (
                            <p style={{ color: "#FF0000", marginTop: "10px" }}>
                              Please select at least one tag.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Display selected tags in the div below the search input */}

                  {selectedTagsData.length > 0 && (
                    <>
                      <div className="d-flex flex-column mt-4 alert alert-success">
                        <Form.Label className="mt-0 mb-1 text-muted h5">
                          Your Question Was Tagged With:
                        </Form.Label>
                        <div className="d-flex">
                          {selectedTagsData.map((tag) => (
                            <Tag
                              key={tag.id}
                              tagId={tag.id}
                              text={tag.name}
                            />
                          ))}
                        </div>
                        <p>{selectedTagsData.length === 0 && "Loading tags..."}</p>
                      </div>
                    </>
                  )}
                </Form.Group>

                {/* Image input */}
                <Form.Group controlId="imageInput" className="card p-4 mt-2">
                  <Form.Label className="mt-3 mb-0 text-muted h4">
                    Add Images (up to five)
                  </Form.Label>
                  <small className="text-muted">
                    Our team of experts, alongside our AI service, relies on
                    high-quality images to accurately detect and predict
                    infections. Providing us with clear and detailed images
                    enables us to deliver more precise and effective
                    recommendations tailored to your needs.
                  </small>
                  <br />
                  <Form.Control
                    type="file"
                    accept="image/jpg"
                    multiple
                    onChange={handleImageChange}
                    name="images"
                  />

                  {/* Display selected images */}
                  {images.length > 0 && (
                    <div>
                      <Form.Label className="mt-3 mb-0 text-muted h4">
                        Selected Images
                      </Form.Label>
                      <div className="d-flex flex-wrap mt-2">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="mr-2"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                with: "200px",
                                maxWidth: "200px",
                                maxHeight: "200px",
                                height: "200px",
                                margin: "10px",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Selected Image ${index + 1}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <Button
                              variant="danger"
                              size="sm"
                              className="mt-2 p-1"
                              onClick={() => handleRemoveImage(index)}
                              style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Form.Group>
                <div className="mt-4">
                  <Button
                    type="submit"
                    className="btn-sm mx-1"
                    variant="primary"
                    disabled={loading}
                  >
                    Submit Your Question
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default AskQuestion;
