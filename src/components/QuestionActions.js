import React from "react";
import { FaThumbsUp, FaStar, FaEdit, FaTrash, FaThumbtack, FaVoteYea } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

const QuestionActions = ({ username, questionId }) => {
  const handleVote = () => {
    // Logic to handle vote action
    console.log("Voted on question", questionId);
  };

  const handleLike = () => {
    // Logic to handle like action
    console.log("Liked question", questionId);
  };

  const handleFavorite = () => {
    // Logic to handle favorite action
    console.log("Favorited question", questionId);
  };

  const handlePin = () => {
    // Logic to handle pin action
    console.log("Pinned question", questionId);
  };

  const handleEdit = () => {
    // Logic to handle edit action
    console.log("Editing question", questionId);
  };

  const handleDelete = () => {
    // Logic to handle delete action
    console.log("Deleted question", questionId);
  };

  return (
    <div className="action-icons d-flex justify-content-end mt-0 bg-light" style={{borderRadius: 50}}>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Vote For Question</Tooltip>}
      >
        <div className="icon-wrapper text-primary mx-3">
          <FaVoteYea />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Like Question</Tooltip>}
      >
        <div className="icon-wrapper text-primary mx-3">
          <FaThumbsUp />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Add To Favourite</Tooltip>}
      >
        <div className="icon-wrapper text-primary mx-3">
          <FaStar />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Pin Question</Tooltip>}
      >
        <div className="icon-wrapper text-primary mx-3">
          <FaThumbtack />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Add Recommendation</Tooltip>}
      >
        <div className="icon-wrapper text-primary mx-3">
          <FaEdit />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Delete Question</Tooltip>}
      >
        <div className="icon-wrapper text-danger mx-3">
          <FaTrash />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default QuestionActions;


