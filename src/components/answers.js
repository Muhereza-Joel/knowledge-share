import React, { useState, useEffect } from "react";
import Comments from "./comments";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionMoment from "./questionMoment";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";

const Answer = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

  useEffect(() => {
    // Make a GET request to fetch comments for the answer
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/comments/all/${props.answerId}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [props.answerId]); // Dependency array to re-run effect when answerId changes

  const handleDelete = (deletedCommentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== deletedCommentId
    );

    setComments(updatedComments);
    toast.success("Comment deleted successfully!", {
      style: { backgroundColor: "#cce6e8", color: "#333" },
    });
  };

  const handleCommentSubmit = async () => {
    if (commentInput.trim() !== "") {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/comments/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answerId: props.answerId,
            questionId: props.questionId,
            userId: cookieData.USERID_KEY,
            comment: commentInput,
          }),
        });

        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]);

        setCommentInput("");

        setIsInputVisible(false);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const cardStyle = props.role === "expert" ? { backgroundColor: "#e6ffe6" } : {};

  return (
    <div className="card mt-2 p-2" style={cardStyle}>
      <div className="text-secondary">
        <div className="">
          <div className="d-flex flex-row">
            <div className="w-25 pt-5">
              {props.role === "expert" && (
                <span
                  className="badge bg-dark text-light py-2 px-3 fw-100"
                  style={{ borderRadius: 50 }}
                >
                  Attendant Answer
                </span>
              )}
            </div>

            <div className="w-75 text-end">
              <QuestionMoment
                avatarUrl={props.avatarUrl}
                username={props.username}
                created_at={props.created_at}
              />
            </div>
          </div>
        </div>
        <hr />
        <div
          dangerouslySetInnerHTML={{
            __html: String(props.answerContent) || "",
          }}
        />
        <hr />
        {/* Toggleable input for adding a comment */}
        <div className="mt-4">
          <Comments comments={comments} onDelete={handleDelete} />

          {isInputVisible && (
            <div className="mt-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Type your comment..."
                className="form-control my-2"
              />
              <button
                className="btn btn-sm btn-secondary ms-0"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
            </div>
          )}

          <button
            className={`btn btn-sm btn-secondary ms-0 mt-3 ${
              isInputVisible ? "d-none" : ""
            }`}
            onClick={() => setIsInputVisible(true)}
          >
            Add Comment
          </button>

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
    </div>
  );
};

export default Answer;
