import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestionsTagged } from "../redux/reducers/questionsTaggedSlice";
import QuestionCard from "./questionCard";
import PopularTag from "./popularTag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { useParams } from "react-router-dom";
import NoQuestionsSVG from "./NoQuestionsSVG";

const QuestionsTagged = (props) => {
  const dispatch = useDispatch();
  const { tagId } = useParams();

  const {
    allQuestionsTaggedData,
    popularTagsData,
    taggedTagData,
    loading,
    error,
  } = useSelector((state) => state.questionsTagged);

  useEffect(() => {
    dispatch(fetchQuestionsTagged(tagId));
  }, [dispatch, tagId]);

  const panelStyle = {
    minHeight: "90vh",
    position: "sticky",
    top: 0,
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
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
                    {allQuestionsTaggedData &&
                    allQuestionsTaggedData.length > 0 ? (
                      <>
                        <div className="d-flex align-items-center mb-3">
                          <div className="pt-2 w-75 h5 ms-3">
                            All Questions Tagged:{" "}
                            <span className="badge bg-success">
                              {taggedTagData.name}
                            </span>
                          </div>
                        </div>
                        {allQuestionsTaggedData.map((question, index) => (
                          <QuestionCard
                            key={index}
                            data={question}
                            currentUser={`${props.username}`}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="text-center">
                        <NoQuestionsSVG
                          style={{ width: "200%", height: "200%" }}
                          tagName={taggedTagData.name}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div id="right-panel" style={panelStyle}>
                  <div className="p-2 mt-0 mx-2">
                    <h6 className="fw-bold text-start text-secondary p-1">
                      Popular Tags
                    </h6>

                    {popularTagsData.map((tag, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default QuestionsTagged;
