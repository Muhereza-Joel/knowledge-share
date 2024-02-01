import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import Tag from "./tag";
import { useNavigate } from "react-router-dom";
import Avator from "../assets/images/MyImage.jpg";
import QuestionMoment from "./questionMoment";


const QuestionCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const {
    username,
    questionId,
    questionTitle,
    tags,
    votes,
    answers,
    views,
    created_at,
    onQuestionClick,
  } = props.data;

  const questionUrl = `/knowledge-share/${props.currentUser}/questions/${questionId}`;

  useEffect(() => {
    // Clean up the hover state when unmounting
    return () => setIsHovered(false);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    // Call the callback function passed from Dashboard
    onQuestionClick && onQuestionClick(questionId);
    navigate(`/knowledge-share/${props.currentUser}/questions/${questionId}`);
  };

  return (
    <div
      className="card px-3 py-2 my-1"
      style={{
        backgroundColor: isHovered ? "#f6f9ff" : "transparent",
        transition: "border 0.3s ease",
        border: "none",
        borderRadius: "0px"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="row g-0">
        <div className="col-sm-2">
          <div className="d-flex flex-column">
            <div><span className="fw-bold">{votes}</span> Votes</div>
            <div><span className="fw-bold">{answers}</span> Answers</div>
            <div><span className="fw-bold">{views}</span> Views</div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="text-primary">
            <Nav.Item className="mt-3">
              <Nav.Link href={questionUrl} onClick={handleClick}>
                <p
                  className="fw-normal text-primary h5"
                  style={{
                    textDecoration: isHovered ? "underline" : "none",
                    fontStyle: 'bold',
                    transition: "border 0.3s ease",
                  }}
                >
                  {questionTitle}
                </p>
              </Nav.Link>
            </Nav.Item>
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
        <div className="col-sm-2">
          <div className="d-flex flex-column">
           <QuestionMoment avator={Avator} username={username} created_at={created_at}/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuestionCard);
