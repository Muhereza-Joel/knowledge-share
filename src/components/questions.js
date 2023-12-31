import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import QuestionCard from "./questionCard";
import PopularTag from "./popularTag";

const Questions = (props) => {
  const [state, setState] = useState({
    userId: 123,
    questionData: [],
    popularTagsData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsResponse, tagsResponse] = await Promise.all([
          fetch("http://localhost:3001/api/questions/all/"),
          fetch("http://localhost:3001/api/tags/popular-tags/"),
        ]);

        if (!questionsResponse.ok || !tagsResponse.ok) {
          throw new Error(
            `HTTP error! Questions Status: ${questionsResponse.status}, Tags Status: ${tagsResponse.status}`
          );
        }

        const [questionsData, tagsData] = await Promise.all([
          questionsResponse.json(),
          tagsResponse.json(),
        ]);

        setState((prev) => ({
          ...prev,
          questionData: questionsData,
          popularTagsData: tagsData,
          loading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const panelStyle = {
    minHeight: "90vh",
  };

  const { questionData, popularTagsData, loading, error } = state;

  return (
    <div>
      <div className="row g-0">
        <div className="col-lg-12">
          <div id="content-section" className="row g-0">
            <div className="col-lg-9">
              <div
                id="middle-panel"
                className="card p-0 mt-2"
                style={panelStyle}
              >
                <div className="p-3">
                  <div className="d-flex align-items-center mb-3">
                    <div className="pt-2 w-75 h4">Popular Questions</div>
                  </div>

                  {questionData.map((question, index) => (
                    <QuestionCard
                      key={index}
                      {...question}
                      username={`${props.username}`}
                      onQuestionClick={props.onQuestionClick}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div
                id="right-panel"
                className="d-flex flex-column p-2 m-2"
                style={panelStyle}
              >
                <div className="card-title h6 mb-3">Popular Tags</div>

                {popularTagsData.map((tag, index) => (
                  <PopularTag
                    key={tag.id}
                    id={tag.id}
                    title={tag.name}
                    description={tag.description}
                    username={`${props.username}`}
                    showIcons={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Questions);
