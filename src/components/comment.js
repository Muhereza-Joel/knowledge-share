import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faReply } from "@fortawesome/free-solid-svg-icons";

const Comment = (props) => {
  const currentUserId = localStorage.getItem("userId");
  const { comment, onDelete } = props;
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [commentText, setCommentText] = useState(comment.comment);

  const [loadingReplies, setLoadingReplies] = useState(false);

  const fetchReplies = async () => {
    try {
      setLoadingReplies(true);

      // Make a GET request to retrieve replies for the comment
      const response = await fetch(
        `http://localhost:3001/api/v1/comments/replies/${comment.id}`
      );

      const data = await response.json();

      // Update the replies state with the retrieved data
      setReplies(data);

      setLoadingReplies(false);
    } catch (error) {
      console.error("Error fetching replies:", error);
      setLoadingReplies(false);
    }
  };

  useEffect(() => {
  
    fetchReplies();
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  const handleReplySubmit = async () => {
   
    if (replyInput.trim() !== "") {
      try {
     
        const response = await fetch(
          "http://localhost:3001/api/v1/comments/add-reply",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              commentId: comment.id,
              reply: replyInput,
              userId: localStorage.getItem("userId"),
            }),
          }
        );

        const data = await response.json();

        setReplies([...replies, data]);

        setReplyInput(""); // Clear the input field after submission.
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the comment
      const response = await fetch(
        `http://localhost:3001/api/v1/comments/delete/${comment.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (data.message === "Comment Deleted Successfully") {
        // Pass the deleted comment's ID to the parent component to remove it from the list
        onDelete(comment.id);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = async () => {
    try {
      // Make a PUT request to edit the comment
      const response = await fetch(
        `http://localhost:3001/api/v1/comments/update/${comment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: editedComment,
          }),
        }
      );

      const data = await response.json();
      if (data.message === "Comment Updated Successfully") {
        setIsEditing(false);
        setCommentText(data.data.comment);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <div>
      <div
        className="p-1 mt-1 mb-4"
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
      >
        <span className="fw-bold">
          added by{" "}
          {`${comment.username} ${moment(comment.created_at).fromNow()}`}
        </span>
        <p>{commentText}</p>

        {currentUserId === comment.user_id && (
          <button
            className="btn btn-secondary btn-sm mb-2 me-2"
            onClick={() => setIsEditing(true)}
            title="Edit Comment"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}

        {currentUserId === comment.user_id && (
          <button
            className="btn btn-danger btn-sm mb-2 me-2"
            onClick={handleDelete}
            title="Delete Comment"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}

        {/* Button to toggle input */}
        <button
          className="btn btn-secondary btn-sm mb-2"
          onClick={toggleReplyInput}
        >
          {showReplyInput ? "Hide Replies" : "Replies"}
        </button>

        {isEditing && (
          <div>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="form-control mb-2 mt-2"
            />
            <button className="btn btn-success btn-sm" onClick={handleEdit}>
              Save
            </button>
          </div>
        )}

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
                    className="p-1 my-2 ms-3 card"
                    style={{ backgroundColor: "#fff", borderRadius: "8px" }}
                  >
                    <span className="fw-bold">{`${reply.username} ${moment(
                      reply.created_at
                    ).fromNow()}`}</span>
                    <p>{reply.reply}</p>
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
