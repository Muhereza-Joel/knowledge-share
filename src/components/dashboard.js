import React, { Component, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import Home from "./home";
import Questions from "./questions";
import Tags from "./tags";
import QuestionDetails from "./questionDetails";
import AskQuestion from "./askQuestion";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponent: localStorage.getItem("selectedComponent") || "home",
      questionId: localStorage.getItem("selectedQuestionId") || "",
    };
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

  // Function to handle NavLink click and update the selected component
  handleNavLinkClick = (component) => {
    this.setState({ selectedComponent: component });
    // Save the selected component to localStorage
    localStorage.setItem("selectedComponent", component);
  };

  renderSelectedComponent = () => {
    // Determine which component to render based on the selectedComponent state
    switch (this.state.selectedComponent) {
      case "home":
        return (
          <Home
            username={`${this.props.username}`}
            onAskQuestionClick={this.handleNavLinkClick}
          />
        );
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
      case "askQuestion":
        return <AskQuestion />;
      default:
        return null;
    }
  };

  handleQuestionLinkClick = (questionId) => {
    this.setState({
      selectedComponent: "questionDetails",
    });
    this.handleNavLinkClick("questionDetails");
    localStorage.setItem("selectedQuestionId", questionId);
  };

  render() {
    const username = this.props.username;

    return (
      <div style={this.style}>
        <div className="row mx-0 mt-0" style={this.topPaneStyle}>
          <div className="card d-flex justify-content-center">
            <div className="d-flex">
              <div className="w-25">
                <h5>
                  <span className="text-success">Knowledge</span>Share
                </h5>
              </div>

              <div className="w-75 d-flex">
                <Nav.Item>
                  <Nav.Link
                    href={`/knowledge-share/${username}/`}
                    className="text-info px-2 fw-bold text-dark"
                    onClick={() => this.handleNavLinkClick("home")}
                  >
                    {username}
                  </Nav.Link>
                </Nav.Item>

                <h6 className="mx-4"></h6>
                <h6 className="mx-2 ml-4">Notifications</h6>
                <h6 className="mx-2">Settings</h6>
                <h6 className="mx-2">Profile</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-lg-2">
            <div
              className="d-flex flex-column p-2 m-2"
              style={this.leftPanelStyle}
            >
              <Nav.Item className="d-flex align-items-center mt-3">
                <Nav.Link
                  href={`/knowledge-share/${username}/questions/ask-question/`}
                  className="text-info px-2 fw-bold text-dark"
                  onClick={() => this.handleNavLinkClick("askQuestion")}
                >
                  Ask Question
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="d-flex align-items-center mt-3">
                <Nav.Link
                  href={`/knowledge-share/${username}/questions/`}
                  className="text-info px-2 fw-bold text-dark"
                  onClick={() => this.handleNavLinkClick("questions")}
                >
                  All Questions
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="d-flex align-items-center mt-3">
                <Nav.Link
                  href={`/knowledge-share/${username}/tags/`}
                  className="text-info px-2 fw-bold text-dark"
                  onClick={() => this.handleNavLinkClick("tags")}
                >
                  Tags
                </Nav.Link>
              </Nav.Item>
            </div>
          </div>

          <div className="col-lg-10">
            <div id="content-section" className="row g-0">
              {/* Render the selected component */}
              {this.renderSelectedComponent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default memo(Dashboard);
