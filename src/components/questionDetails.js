import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tag from "./tag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Nav, Accordion } from "react-bootstrap";
import Answer from "./answers";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";
import ImageZoom from "./ImageZoom"; // Import the ImageZoom component

const QuestionDetails = ({ username, questionDetails }) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [isHovered, setIsHovered] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [answers, setAnswers] = useState(questionDetails.answers || []); // Initialize with an empty array if undefined
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnswers(questionDetails.answers || []); // Update answers state when questionDetails.answers changes
  }, [questionDetails.answers]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAnswerChange = (content) => {
    setAnswerContent(content);
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "calc(100vh - 0px)",
    overflow: "auto", // Add overflow: auto to enable scrolling when content is too long
  };

  const quillEditorStyle = {
    height: "50vh",
    backgroundColor: "#f6f9ff",
    border: "1px",
  };

  // Check if questionDetails is defined before destructuring
  const { questionId, questionTitle, tags, votes, views, description, images } =
    questionDetails || {};

  const handleAnswerSubmit = async (event) => {
    try {
      event.preventDefault();
      // Prepare the data for the POST request

      // Check if required fields are filled
      if (!answerContent) {
        alert("Please add your answer before you submit.");
        return;
      }

      const postData = new FormData();
      postData.append("questionId", questionId);
      postData.append("answer", answerContent);
      postData.append("userId", cookieData.USERID_KEY);

      // Make the POST request to your API endpoint
      const response = await fetch(
        `${API_BASE_URL}/api/v1/questions/add-answer`,
        {
          method: "POST",
          body: postData,
        }
      );

      if (response.ok) {
        // Update the answers state with the new answer
        const newAnswer = {
          username: username, // Add the username
          created_at: new Date().toISOString(), // Add the current timestamp
          answerContent: answerContent,
        };

        setAnswers([...answers, newAnswer]);

        toast.success("Answer added successfully!", {
          style: { backgroundColor: "#cce6e8", color: "#333" },
        });
        setAnswerContent("");
      } else {
        console.error("Failed to submit answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting answer:", error.message);
      // Handle error, show message to the user, etc.
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Show the modal when delete button is clicked
  };

  const handleDeleteConfirm = async () => {
    try {
      // Make the DELETE request to your API endpoint
      const response = await fetch(
        `${API_BASE_URL}/api/v1/questions/delete/${questionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (response.ok) {
        toast.success("Question deleted successfully!", {
          style: { backgroundColor: "#cce6e8", color: "#333" },
        });
        setShowDeleteModal(false);
        setTimeout(
          () =>
            navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/questions/`),
          2000
        );
      } else {
        console.error("Failed to delete question:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  };

  return (
    <div style={style}>
      <TopBar username={username} />
      <div className="row g-0">
        <div className="col-sm-2">
          <div style={{ position: "fixed", top: "50px", width: "18%" }}>
            <LeftSideBar username={username} />
          </div>
        </div>
        <div className="col-sm-10">
          <div className="mt-0 p-2">
            <div className="row g-0">
              <div className="col-lg-7">
                <div className="">
                  <div
                    className="card p-3"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="text-primary">
                      <div className="d-flex flex-row flex-wrap">
                        <div className="w-50">
                          <p className="fw-bold text-secondary h5">
                            {questionTitle}
                          </p>
                        </div>
                        <div className="w-50 text-end">
                          {cookieData.USERROLE_KEY === "admin" && (
                            <Button
                              className="btn btn-sm btn-danger mb-3"
                              type="submit"
                              onClick={handleDeleteClick}
                            >
                              Delete Question
                            </Button>
                          )}
                          {cookieData.USERROLE_KEY === "expert" && (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                navigate(
                                  `/knowledge-share/${username}/questions/recommendations/create/${questionId}`
                                )
                              }
                            >
                              Add Recommendations
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row  align-items-center">
                        <div className="mx-1">
                          {answers && answers.length} Answers
                        </div>
                        <div className="mx-1">{votes} Votes</div>
                        <div className="mx-1">{views} Views</div>
                      </div>
                      <hr></hr>

                      <div
                        className="text-secondary"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                      <hr></hr>
                    </div>

                    <div className="d-flex mt-2">
                      {tags && tags.length > 0 ? (
                        tags.map((tag, index) => (
                          <Tag
                            key={index}
                            text={tag.name}
                            tagId={tag.id}
                            username={username}
                          />
                        ))
                      ) : (
                        <span>No tags available</span>
                      )}
                    </div>
                  </div>

                  {answers && answers.length > 0 ? (
                    answers.map((answer, index) => (
                      <Answer
                        key={index}
                        answerId={answer.answerId}
                        questionId={answer.questionId}
                        userId={answer.userId}
                        username={answer.username}
                        created_at={answer.created_at}
                        answerContent={answer.answerContent}
                        avatarUrl={answer.avatarUrl}
                        role={answer.role}
                      />
                    ))
                  ) : (
                    <div>No answers available</div>
                  )}

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
                </div>
              </div>
              <div className="col-lg-5">
                <div className="p-3">
                  <Accordion defaultActiveKey="1" className="mt-0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Question Images</Accordion.Header>
                      <Accordion.Body>
                        <div className="card-columns">
                          <div className="d-flex flex-row">
                            {images && images.length > 0 ? (
                              images.map((image, index) => (
                                <ImageZoom
                                  key={index}
                                  imageUrl={image.url}
                                  altText={image.alt}
                                  height={150}
                                  width={150}
                                />
                              ))
                            ) : (
                              <p>No images available</p>
                            )}
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <div className="card mt-2" style={quillEditorStyle}>
                    <h6 className="fw-bold text-secondary">Add Your Answer</h6>
                    <Form onSubmit={handleAnswerSubmit}>
                      <Form.Group className="mb-3">
                        <ReactQuill
                          theme="snow"
                          value={answerContent}
                          onChange={handleAnswerChange}
                          style={quillEditorStyle}
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="success"
                        className="mt-5"
                        size="sm"
                      >
                        Submit Answer
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default memo(QuestionDetails);
