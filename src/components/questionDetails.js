import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tag from "./tag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";

const QuestionDetails = ({ username, questionDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  // Check if questionDetails is defined before destructuring
  const { questionTitle, tags, votes, answers, views, description, images } =
    questionDetails || {};

  return (
    <div style={style}>
      <TopBar username={username} />
      <div className="row g-0">
        <div className="col-sm-2">
          <LeftSideBar username={username} />
        </div>
        <div className="col-sm-10">
          <div className="mt-0 p-2">
            <div className="row g-0">
              <div className="col-lg-9">
                <div>
                  <div
                    className="card p-3"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h4>Question Details</h4>
                    <div className="text-primary">
                      {/* Use optional chaining to access nested properties */}
                      <p className="fw-bold text-secondary h5">
                        {questionTitle}
                      </p>
                      <div className="d-flex flex-row  align-items-center">
                        <div className="mx-1">{answers} Answers</div>
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

                  <div className="h5 mt-4">Add Your Answer?</div>
                  <div className="px-0">
                    <textarea
                      className="card w-100"
                      rows={8}
                      cols={102}
                    ></textarea>
                    <button className="btn btn-sm btn-secondary mt-2 mb-3">
                      Submit Answer
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
              <div className="d-flex flex-column justify-content-center">
            {/* Conditionally render images if available */}
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
