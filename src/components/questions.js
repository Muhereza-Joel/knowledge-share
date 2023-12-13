import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Nav } from "react-bootstrap";
import QuestionCard from "./questionCard";
import PopularTag from "./popularTag";

class Questions extends Component {

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
  };

  render() {
    const { questionData, loading, error } = this.state;

    return (
      <div>
       
        <div className="row g-0">

          <div className="col-lg-12">
            <div id="content-section" className="row g-0">
              <div className="col-lg-9">
                <div
                  id="middle-panel"
                  className="card p-2 m-2"
                  style={this.panelStyle}
                >
                <div className="p-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="pt-2 w-75 h4">Popular Questions</div>
                </div>

                {/* {questionData && <QuestionCard {...questionData} />} */}
                {questionData.map((question, index) => (
                  <QuestionCard key={index} {...question} username={`${this.props.username}`}/>
                ))}
              </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div
                  id="right-panel"
                  className="d-flex flex-column p-2 m-2"
                  style={this.panelStyle}
                >
                  <div className="card-title h6 mb-3">Popular Tags</div>

                  <PopularTag title="Gardening" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Tomatoes" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Maize" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Herbicides" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Harvesting" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Mulching" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Prunning" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Weeding" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Planting" description="This tag has all questions about gardening and tools"/>
                  <PopularTag title="Marketing" description="This tag has all questions about gardening and tools"/>
                  

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
