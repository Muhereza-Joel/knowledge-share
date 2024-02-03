import React, { useState } from "react";
import moment from "moment";

const Comment = (props) => {
  const { comment } = props;
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplySubmit = () => {
    // Validate that the reply is not empty before submitting
    if (replyInput.trim() !== "") {
      // You can handle the reply submission logic here.
      // For simplicity, let's just add the reply to the state.
      setReplies([
        ...replies,
        { username: "John", content: replyInput, created_at: new Date() },
      ]);
      setReplyInput(""); // Clear the input field after submission.
    }
  };

  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div>
      <div
        className="p-1 mt-1 mb-4"
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
      >
        <span className="fw-bold">added by {`${comment.username} ${moment(
          comment.created_at
        ).fromNow()}`}</span>
        <p>{comment.content}</p>

        {/* Button to toggle input */}
        <button
          className="btn btn-secondary btn-sm mb-2"
          onClick={toggleReplyInput}
        >
          {showReplyInput ? "Hide Replies" : "Replies"}
        </button>

        {/* Input for reply */}
        {showReplyInput && (
          <div>
            {/* List of replies */}
            {replies.length > 0 && (
              <div className="mt-3">
                <p className="fw-bold">Replies:</p>
                {replies.map((reply, index) => (
                  <div
                    key={index}
                    className="p-1 my-1 ms-3 card"
                    style={{ backgroundColor: "#fff", borderRadius: "8px" }}
                  >
                    <span className="fw-bold">{`${reply.username} ${moment(
                      reply.created_at
                    ).fromNow()}`}</span>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              className="form-control mb-2 mt-4"
              placeholder="Reply..."
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
            />
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleReplySubmit}
            >
              Add Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
