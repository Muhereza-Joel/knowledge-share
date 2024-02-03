import React, { useState } from "react";
import moment from "moment";
import Comments from "./comments";
import "bootstrap/dist/css/bootstrap.css";

const Answer = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleCommentSubmit = () => {
    // Validate that the comment is not empty before submitting
    if (commentInput.trim() !== "") {
      // Add new comment to the comments list
      setComments([...comments, { content: commentInput, username: "User", created_at: new Date() }]);
      // Clear the comment input
      setCommentInput("");
      // Hide the input field after submitting
      setIsInputVisible(false);
    }
  };

  return (
    <div className="card mt-2 p-2">
      <div className="text-secondary">
        <p className="fw-bold">{`Answer by ${props.username} ${moment(
          props.created_at
        ).fromNow()}`}</p>

        <div dangerouslySetInnerHTML={{ __html: String(props.answerContent) || "" }} />

        {/* Toggleable input for adding a comment */}
        <div className="mt-4">

          <Comments comments={comments}/>

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
            className={`btn btn-sm btn-primary ms-0 mt-3 ${isInputVisible ? 'd-none' : ''}`}
            onClick={() => setIsInputVisible(true)}
          >
            Add Comment
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default Answer;