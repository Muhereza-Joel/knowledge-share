import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import QuestionCard from "./questionCard";
import PopularTag from "./popularTag";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { useParams } from "react-router-dom";
import NoQuestionsSVG from "./NoQuestionsSVG";


const QuestionsTagged = (props) => {
  const { tagId } = useParams();
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [state, setState] = useState({
    userId: cookieData.USERID_KEY,
    questionData: [],
    lastUsedTagsData: [],
    tagName: "",
    loading: true,
    error: null,
  });

  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/get-avator/${cookieData.USERID_KEY}`
        );

        if (response.ok) {
          const avatarData = await response.json();
          if (Array.isArray(avatarData) && avatarData.length > 0) {
            setAvatarUrl(avatarData[0].url);
          } else {
            console.error("Invalid avatar data structure");
          }
        } else {
          console.error("Failed to fetch avatarUrl");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchAvatarUrl();
  }, []);

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/tags/popular-tags/`
        );

        if (response.ok) {
          const tagsData = await response.json();

          setState((prev) => ({
            ...prev,
            lastUsedTagsData: tagsData, 
          }));
          
        } else {
          console.error("Failed to fetch avatarUrl");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchPopularTags();
  }, []);
  

  useEffect(() => {
    const fetchTagDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/tags/all/${tagId}`
        );

        if (response.ok) {
          const tagData = await response.json();

          setState((prev) => ({
            ...prev,
            tagName: tagData.name, 
          }));
          
        } else {
          console.error("Failed to fetch avatarUrl");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchTagDetails();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/v1/questions/tagged/${tagId}`),
          ]);

        if (!questionsResponse.ok ) {
          throw new Error(
            `HTTP error! Questions Status: ${questionsResponse.status}`
          );
        }

        const [questionsData] = await Promise.all([
          questionsResponse.json(),
        ]);

        setState((prev) => ({
          ...prev,
          questionData: questionsData,
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
  }, [tagId]); // Add dependencies as needed

  const panelStyle = {
    minHeight: "90vh",
    position: "sticky",
    top: 0,
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  const { questionData, lastUsedTagsData, tagName } = state;

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
                    {questionData.length > 0 ? (
                      <>
                        <div className="d-flex align-items-center mb-3">
                          <div className="pt-2 w-75 h5 ms-3">
                            All Questions Tagged:{" "}
                            <span className="badge bg-success">{tagName}</span>
                          </div>
                        </div>
                        {questionData.map((question, index) => (
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
                          style={{ width: "200%", height: "200%" }} tagName={tagName}
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
                      Popular Tag
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
        </div>
      </div>
    </div>
  );
};

export default QuestionsTagged;
