import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import Tag from "./tag";


const QuestionCard = ({
  username,
  questionId,
  questionTitle,
  tags,
  votes,
  answers,
  views,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const questionUrl = `/knowledge-share/${username}/questions/${questionId}`;

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

  return (
    <div
      className="card px-4 py-3 my-1"
      style={{
        backgroundColor: isHovered ? "#f6f9ff" : "transparent",
        transition: "border 0.3s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="row">
        <div className="col-sm-2">
          <div className="d-flex flex-column">
            <div>{votes} Votes</div>
            <div>{answers} Answers</div>
            <div>{views} Views</div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="text-primary">
            <Nav.Item className="mt-3">
              <Nav.Link href={questionUrl}>
                <p
                  className="fw-normal text-secondary h5"
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
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};

export default memo(QuestionCard);
