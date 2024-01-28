import React, { Component, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import Home from "./home";
import Questions from "./questions";
import Tags from "./tags";
import QuestionDetails from "./questionDetails";
import AskQuestion from "./askQuestion";
import LeftSideBar from "./leftSideBar";
import TopBar from "./topBar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    
  }

  style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  panelStyle = {
    minHeight: "90vh",
  };

  leftPanelStyle = {
    ...this.panelStyle,
    position: "sticky",
    top: 60,
  };

  topPaneStyle = {
    width: "100%",
    height: "7vh",
    zIndex: "3",
    position: "sticky",
    top: 0,
  };

 
  renderSelectedComponent = () => {
    // Determine which component to render based on the selectedComponent state
    switch (this.state.selectedComponent) {
      
      case "questions":
        return (
          <Questions
            username={`${this.props.username}`}
            onQuestionClick={this.handleQuestionLinkClick}
          />
        );
      case "tags":
        return <Tags username={`${this.props.username}`} />;
      case "questionDetails":
        return <QuestionDetails questionId={`${this.state.questionId}`} />;
      
      default:
        return null;
    }
  };


  render() {
    const username = this.props.username;

    return (
      <div style={this.style}>
        <TopBar username="muhereza-joel" />
        <div className="row g-0">
          <div className="col-lg-2">
            <LeftSideBar
              username={username}
              handleNavLinkClick={this.handleNavLinkClick}
            />
          </div>

          <div className="col-lg-10">
            <div id="content-section" className="row g-0">
              <Home
                username={`${this.props.username}`}
                onAskQuestionClick={this.handleNavLinkClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default memo(Dashboard);
