import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import QuestionCard from "./questionCard";
import ShortProfile from "./shortProfile";
import PopularTag from "./popularTag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import NoUserQuestionsSVG from "./NoUserQuestionsSVG";
import {
  fetchMyQuestionsAndLastUsedTags,
  fetchMyAvatorUrl,
} from "../redux/reducers/myQuestionsSlice";

const MyQuestions = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myQuestionData, lastUsedTagsData, avatarUrl } = useSelector(
    (state) => state.myQuestions
  );

  const { id, avator } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchMyAvatorUrl());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMyQuestionsAndLastUsedTags(id));
  }, [dispatch]);

  const panelStyle = {
    minHeight: "90vh",
    position: "sticky",
    top: 0,
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "100%",
  };

  return (
    <div style={style}>
      <div className="row g-0">
        <TopBar username={props.username} />
        <div className="col-sm-2">
          <div style={{ position: "fixed", top: "50px", width: "18%" }}>
            <LeftSideBar username={props.username} />
          </div>
        </div>

        <div className="col-sm-10">
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
                      <div className="pt-2 w-75 h4">All Questions By You</div>

                      <Nav.Item className="mt-3 text-end w-25">
                        <h6
                          onClick={() =>
                            navigate(
                              `/knowledge-share/${props.username}/questions/ask-question/`
                            )
                          }
                          className="text-info px-2 fw-bold"
                        >
                          <button className="btn btn-sm btn-primary bg-success">
                            Ask Question ?
                          </button>
                        </h6>
                      </Nav.Item>
                    </div>

                    {myQuestionData.length === 0 ? (
                      <NoUserQuestionsSVG />
                    ) : (
                      myQuestionData.map((question, index) => (
                        <QuestionCard
                          key={index}
                          data={question}
                          currentUser={props.username}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div id="right-panel" style={panelStyle}>
                  <ShortProfile username={props.username} avatarUrl={avator} />

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
                        username={props.username}
                        showIcons={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuestions;
