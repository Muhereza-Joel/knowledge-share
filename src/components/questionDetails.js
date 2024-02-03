import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tag from "./tag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import Answer from "./answers";

const QuestionDetails = ({ username, questionDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [answers, setAnswers] = useState(questionDetails.answers || []); // Initialize with an empty array if undefined

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
  };

  const quillEditorStyle = {
    height: "200px",
    marginBottom: "20px",
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
      postData.append("userId", localStorage.getItem("userId"));

      // Make the POST request to your API endpoint
      const response = await fetch(
        "http://localhost:3001/api/v1/questions/add-answer",
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
              <div className="col-lg-10">
                <div>
                  <div
                    className="card p-3"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="text-primary">
                      <p className="fw-bold text-secondary h5">
                        {questionTitle}
                      </p>
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
                        username={answer.username}
                        created_at={answer.created_at}
                        answerContent={answer.answerContent}
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
                  <Form onSubmit={handleAnswerSubmit}>
                    <div className="h5 mt-4">Add Your Answer?</div>
                    <Form.Control
                      name="questionId"
                      value={questionId}
                      type="hidden"
                    />
                    <div className="px-0">
                      <ReactQuill
                        value={answerContent}
                        onChange={handleAnswerChange}
                        placeholder="Add your answer for this question"
                        className="card"
                        name="answer"
                        required
                        style={quillEditorStyle}
                      />
                      <Button
                        className="btn btn-sm btn-secondary mb-3"
                        type="submit"
                      >
                        Submit Answer
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="d-flex flex-column justify-content-center">
                  {images &&
                    images.length > 0 &&
                    images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Image ${index + 1}`}
                        className="img-fluid mx-3 mb-2"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuestionDetails);
