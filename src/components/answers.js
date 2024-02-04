import React, { useState, useEffect } from "react";
import moment from "moment";
import Comments from "./comments";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Answer = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    // Make a GET request to fetch comments for the answer
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/comments/all/${props.answerId}`
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
  
    const updatedComments = comments.filter(comment => comment.id !== deletedCommentId);
   
    setComments(updatedComments);
    toast.success("Comment deleted successfully!", {
      style: { backgroundColor: "#cce6e8", color: "#333" },
    });
  };

  const handleCommentSubmit = async () => {

    if (commentInput.trim() !== "") {
      try {

        const response = await fetch(
          "http://localhost:3001/api/v1/comments/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answerId: props.answerId,
              questionId: props.questionId,
              userId: localStorage.getItem("userId"),
              comment: commentInput,
            }),
          }
        );

        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]);
     
        setCommentInput("");
        
        setIsInputVisible(false);

      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <div className="card mt-2 p-2">
      <div className="text-secondary">
        <p className="fw-bold">{`Answer by ${props.username} ${moment(
          props.created_at
        ).fromNow()}`}</p>

        <div
          dangerouslySetInnerHTML={{
            __html: String(props.answerContent) || "",
          }}
        />

        {/* Toggleable input for adding a comment */}
        <div className="mt-4">
          <Comments comments={comments} onDelete={handleDelete}/>

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
                className="btn btn-sm btn-primary ms-0"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
            </div>
          )}

          <button
            className={`btn btn-sm btn-primary ms-0 mt-3 ${
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
