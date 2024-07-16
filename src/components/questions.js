import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestionsAndTags } from "../redux/reducers/questionSlice";
import "bootstrap/dist/css/bootstrap.css";
import QuestionCard from "./questionCard";
import PopularTag from "./popularTag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { Placeholder } from "react-bootstrap";

const Questions = (props) => {
  const dispatch = useDispatch();
  const questionData = useSelector((state) => state.questions.allQuestionData);
  const popularTagsData = useSelector(
    (state) => state.questions.allQuestionsPopularTagsData
  );
  const loading = useSelector((state) => state.questions.allQuestionsLoading);
  const error = useSelector((state) => state.questions.allQuestionsError);

  useEffect(() => {
    dispatch(fetchQuestionsAndTags());
  }, [dispatch]);

  const panelStyle = {
    minHeight: "90vh",
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-lg-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-lg-10">
          <div id="content-section" className="row g-0">
            <div className="col-lg-9">
              {loading ? (
                <div>
                  <div>
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={12}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={10}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={8}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={6}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={4}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={2}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={12}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={10}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={8}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={6}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={4}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={2}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={12}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={10}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={8}
                    />
                    <Placeholder
                      className="my-2"
                      style={{ backgroundColor: "#d5e0eb" }}
                      xs={6}
                    />
                  </div>
                </div>
              ) : (
                <div
                  id="middle-panel"
                  className="card p-0 mt-2"
                  style={panelStyle}
                >
                  <div className="p-3">
                    <div className="d-flex align-items-center mb-3">
                      <div className="pt-2 w-75 h4">All Questions</div>
                    </div>

                    {questionData.map((question, index) => (
                      <QuestionCard
                        key={index}
                        data={question}
                        currentUser={`${props.username}`}
                        loading={loading}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-3">
              <div
                id="right-panel"
                className="card d-flex flex-column p-3 m-2"
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
