import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import QuestionCard from "./questionCard";
import ShortProfile from "./shortProfile";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 123,
      questionData: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { userId } = this.state;
    fetch(`http://localhost:3001/api/questions/all/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched question data
        this.setState({
          questionData: data,
          loading: false,
        });
      })
      .catch((error) => {
        // Handle errors
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }

  panelStyle = {
    minHeight: "90vh",
    position: "sticky",
    top: 60,
  };

  render() {
    const { questionData, loading, error } = this.state;

    return (
      <div>
        <div id="content-section" className="row g-0">
          <div className="col-lg-9">
            <div
              id="middle-panel"
              className="card p-2 m-2"
              style={this.panelStyle}
            >
              <div className="p-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="pt-2 w-75 h4">Your Recent Questions</div>

                  <Nav.Item className="mt-3">
                    <Nav.Link
                      href={`/knowledge-share/${this.props.username}/qestions/ask-question/`}
                      className="text-info px-2 fw-bold"
                    >
                      <button className="btn btn-sm btn-primary">
                        Ask Question
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                </div>

                {/* {questionData && <QuestionCard {...questionData} />} */}
                {questionData.map((question, index) => (
                  <QuestionCard key={index} {...question} username={`${this.props.username}`}/>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div id="right-panel" style={this.panelStyle}>
              <ShortProfile username={`${this.props.username}`}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
