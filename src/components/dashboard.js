import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import Home from "./home";
import Questions from "./questions";
import Tags from "./tags";
import QuestionDetails from "./questionDetails";
import AskQuestion from "./askQuestion";
import LeftSideBar from "./leftSideBar";
import TopBar from "./topBar";
import Cookies from 'js-cookie';

const Dashboard = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [questionId, setQuestionId] = useState(null);
  const username = cookieData.USERNAME_KEY;

  useEffect(() => {
    // Perform any side effects or initialization here
  }, []);

  const handleNavLinkClick = (component) => {
    setSelectedComponent(component);
    // Additional logic if needed
  };

  const handleQuestionLinkClick = (questionId) => {
    setQuestionId(questionId);
    // Additional logic if needed
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "questions":
        return (
          <Questions
            username={username}
            onQuestionClick={handleQuestionLinkClick}
          />
        );
      case "tags":
        return <Tags username={username} />;
      case "questionDetails":
        return <QuestionDetails questionId={questionId} />;
      default:
        return <Home/>;
    }
  };

  return (
    <div style={{ backgroundColor: "#f6f9ff", position: "relative" }}>
      <TopBar username={username} />
      <div className="row g-0">
        <div className="col-lg-2">
          <LeftSideBar
            username={username}
            handleNavLinkClick={handleNavLinkClick}
          />
        </div>

        <div className="col-lg-10">
          <div id="content-section" className="row g-0">
            {renderSelectedComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
