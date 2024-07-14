import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "../redux/actions";
import "bootstrap/dist/css/bootstrap.css";
import QuestionCard from "./questionCard";
import PopularTag from "./popularTag";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import API_BASE_URL from "./appConfig";
import { Placeholder } from "react-bootstrap";

const Questions = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataRequest());
      try {
        const [questionsResponse, tagsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/questions/all/`),
          fetch(`${API_BASE_URL}/api/v1/tags/popular-tags/`),
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

        dispatch(
          fetchDataSuccess({
            questionData: questionsData,
            popularTagsData: tagsData,
          })
        );
      } catch (error) {
        dispatch(fetchDataFailure(error));
      }
    };

    fetchData();
  }, [dispatch]); // Empty dependency array ensures the effect runs once on mount

  const panelStyle = {
    minHeight: "90vh",
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  const { questionData, popularTagsData } = state;

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
              {state.loading ? (
                <div>
                  <div>
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={12} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={10} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={8} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={6} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={4} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={2} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={12} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={10} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={8} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={6} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={4} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={2} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={12} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={10} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={8} />
                      <Placeholder className="my-2" style={{ backgroundColor: '#d5e0eb' }} xs={6} />
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
                        loading={state.loading}
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
