import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import QuestionCard from "./questionCard";
import ShortProfile from "./shortProfile";
import PopularTag from "./popularTag";

const Home = (props) => {
  const [state, setState] = useState({
    userId: 123,
    questionData: [],
    lastUsedTagsData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsResponse, tagsResponse] = await Promise.all([
          fetch(`http://localhost:3001/api/questions/all/${state.userId}`),
          fetch("http://localhost:3001/api/tags/most-used-tags/"),
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
          lastUsedTagsData: tagsData,
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
  }, [state.userId]); // Add dependencies as needed

  const panelStyle = {
    minHeight: "90vh",
    position: "sticky",
    top: 0,
  };

  const { questionData, lastUsedTagsData } = state;

  return (
    <div>
      <div id="content-section" className="row g-0">
        <div className="col-lg-9">
          <div
            id="middle-panel"
            className="card p-0 mt-2"
            style={panelStyle}
          >
            <div className="p-3">
              <div className="d-flex align-items-center mb-3">
                <div className="pt-2 w-75 h4">Your Recent Questions</div>

                <Nav.Item className="mt-3">
                  <Nav.Link
                    href={`/knowledge-share/${props.username}/questions/ask-question/`}
                    className="text-info px-2 fw-bold"
                  >
                    <button className="btn btn-sm btn-primary">
                      Ask Question
                    </button>
                  </Nav.Link>
                </Nav.Item>
              </div>

              {questionData.map((question, index) => (
                <QuestionCard
                  key={index}
                  {...question}
                  username={`${props.username}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div id="right-panel" style={panelStyle}>
            <ShortProfile username={`${props.username}`} />

            <div className="p-2 mt-0 mx-2">
              <hr />
              <h6 className="fw-bold text-center text-secondary p-1">
                Last Used Tags
              </h6>

              {lastUsedTagsData.map((tag, index) => (
                <PopularTag
                  key={index}
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
  );
};

export default Home;
