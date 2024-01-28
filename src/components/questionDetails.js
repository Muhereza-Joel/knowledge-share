import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tag from "./tag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";

const QuestionDetails = ({ username, onQuestionClick }) => {
  const [questionDetails, setQuestionDetails] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const questionUrl = `/knowledge-share/${username}/questions/?questionId`;

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/questions/question/a19d9e44-0326-46ee-8f98-52600edc17e2`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestionDetails(data[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestionDetails();
    setIsHovered(false);
  }, []);

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

  return (
    <div style={style}>
      <TopBar username="muhereza-joel" />
      <div className="row">
        <div className="col-sm-2">
          <LeftSideBar username="muhereza-joel" />
        </div>
        <div className="col-sm-10">
          <div className="mt-4 p-2">
            <h4>Question Details</h4>

            <div className="row g-0">
              <div className="col-lg-8">
                <div>
                  <div
                    className="card p-3"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="text-primary">
                      <p className="fw-bold text-secondary h5">
                        {questionDetails.questionTitle}
                      </p>
                      <div className="d-flex flex-row  align-items-center">
                        <div className="mx-1">
                          {questionDetails.answers} Answers
                        </div>
                        <div className="mx-1">
                          {questionDetails.votes} Votes
                        </div>
                        <div className="mx-1">
                          {questionDetails.views} Views
                        </div>
                      </div>
                      <hr></hr>

                      <p className="text-secondary">
                        {questionDetails.descrption}
                      </p>
                      <hr></hr>
                    </div>

                    <div className="d-flex mt-2">
                      {questionDetails.tags &&
                      questionDetails.tags.length > 0 ? (
                        questionDetails.tags.map((tag, index) => (
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
                    <textarea className="card" rows={8} cols={102}></textarea>
                    <button className="btn btn-sm btn-secondary mt-2 mb-3">
                      Submit Answer
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuestionDetails);
