import React, { Component, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import QuestionCard from "./questionCard";
import PopularTag from "./popularTag";

class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: 123,
      questionData: [],
      popularTagsData: [],
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

      fetch("http://localhost:3001/api/tags/popular-tags/")
        .then((response) => {
          if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
          }

          return response.json();
        })
        .then((data) => {
          this.setState({
            popularTagsData: data,
          })
        })
        .catch((error) => {
          this.setState({
            error: error.message,
          })
        })
  }

  panelStyle = {
    minHeight: "90vh",
  };

  render() {
    const { questionData, popularTagsData, loading, error } = this.state;

    return (
      <div>
       
        <div className="row g-0">

          <div className="col-lg-12">
            <div id="content-section" className="row g-0">
              <div className="col-lg-9">
                <div
                  id="middle-panel"
                  className="card p-0 mt-2"
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

                  {popularTagsData.map((tag, index) => (
                    <PopularTag key={tag.id} id={tag.id} title={tag.name} description={tag.description} username={`${this.props.username}`}/>
                  ))}


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default memo(Questions);
