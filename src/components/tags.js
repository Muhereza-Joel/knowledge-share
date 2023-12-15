import React, { Component, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import PopularTag from "./popularTag";

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 123,
      tagsData: [],
      loading: true,
      error: null,
    };
  }

  panelStyle = {
    minHeight: "90vh",
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/tags/popular-tags/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        this.setState({
          tagsData: data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    const { tagsData} = this.state;
    return (
      <div>
        <div id="content-section">
          <div
            id="middle-panel"
            className="card p-2 m-2"
            style={this.panelStyle}
          >
            <div className="pt-2 w-75 h4 m-2">All Tags</div>
            <div className="row g-0">
              {tagsData.map((tag, index) => (
                <div className="col-lg-3"  key={tag.id}>
                  <div className="card p-4 m-2">
                    <PopularTag
                      key={tag.id}
                      id={tag.id}
                      title={tag.name}
                      description={tag.description}
                      username={`${this.props.username}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default memo(Tags);
