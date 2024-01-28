import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "bootstrap/dist/css/bootstrap.css";
import Tag from "./tag";
import debounce from "lodash/debounce";
import LeftSideBar from "./leftSideBar";
import TopBar from "./topBar";

const AskQuestion = (props) => {
  const [description, setDescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState([]);

  const fetchSuggestedTags = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/tags/popular-tags?query=${searchInput}`
      );
      const data = await response.json();
      setSuggestedTags(data);
    } catch (error) {
      console.error("Error fetching suggested tags:", error);
    }
  };

  // Debounce the fetchSuggestedTags function to avoid rapid API calls
  const debouncedFetch = debounce(fetchSuggestedTags, 300);

  useEffect(() => {
    if (searchInput.length > 0) {
      debouncedFetch();
    } else {
      setSuggestedTags([]);
    }

    // Cleanup function to cancel debouncedFetch when component unmounts
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchInput, debouncedFetch]);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
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
    setImages([...images, ...Array.from(files)]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const quillEditorStyle = {
    height: "300px",
    marginBottom: "50px",
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
      <TopBar username="muhereza-joel" />
      <div className="row">
        <div className="col-sm-2">
          <LeftSideBar username="muhereza-joel" />
        </div>
        <div className="col-sm-10">
          <div className="mt-2 p-2">
            <div className="alert my-2 p-4 alert-success">
              <h2 className="text-secondary ">
                Knowledge Share is a plartform for sharing Knowledge and
                Experience...
              </h2>
              <h4 className="text-info">
                Feel free to ask any question concerning agriculture
              </h4>
              <small>
                The big community of farmers is waiting, Feel free to ask any
                question today?
              </small>
            </div>

            <div className="my-2">
              <Form>
                <Form.Group
                  className="mb-0 p-4 card"
                  controlId="questionDescription"
                >
                  <Form.Label className="h3 text-muted">
                    Compose Your Question
                  </Form.Label>

                  <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Describe your issue or challenge you are currently facing and later associate it with any tags..."
                    name="description"
                    style={quillEditorStyle}
                  />
                </Form.Group>
                <Form.Group className="p-4 card mt-2">
                  <Form.Label className="mt-2 mb-0 text-muted h4">
                    Associated Tags
                  </Form.Label>
                  <br></br>
                  <small>
                    Tags are used to classify and search for questions
                  </small>
                  <Form.Control
                    className="mt-2 mb-3"
                    type="text"
                    placeholder="Type in the tag name to bring the list of tags..."
                    name="title"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  {/* Display suggested tags below the search input */}

                  <div>
                    {searchInput.length > 0 && (
                      <div>
                        {suggestedTags.map((tag) => (
                          <span
                            key={tag.id} // or use a unique key property from your data
                            className={`tag ${
                              selectedTags.includes(tag.name) ? "selected" : ""
                            }`}
                            onClick={() => handleTagClick(tag.name)}
                            style={{
                              backgroundColor: selectedTags.includes(tag.name)
                                ? "#299ea6"
                                : "#666",
                              color: selectedTags.includes(tag.name)
                                ? "#fff"
                                : "#fff",
                              border: selectedTags.includes(tag.name)
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

                  {/* Display selected tags in the div below the search input */}

                  {selectedTags.length > 0 && (
                    <div className="d-flex flex-column mt-4 alert alert-success">
                      <Form.Label className="mt-0 mb-1 text-muted h4">
                        Tags you have selected
                      </Form.Label>
                      <div className="d-flex">
                        {selectedTags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                </Form.Group>

                {/* Image input */}
                <Form.Group controlId="imageInput" className="card p-4 mt-2">
                  <Form.Label className="mt-3 mb-0 text-muted h4">
                    Add Images (up to five)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/jpg"
                    multiple
                    onChange={handleImageChange}
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
                  <Button className="btn-sm mx-1" variant="primary">
                    Submit Your Question
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
