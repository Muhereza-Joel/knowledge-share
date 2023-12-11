import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Nav } from "react-bootstrap";

class Tags extends Component {

  panelStyle = {
    minHeight: "90vh",
  };

  render() {
    return (
      <div>
       
        <div className="row g-0">

          <div className="col-lg-12">
            <div id="content-section" className="row g-0">
              <div className="col-lg-8">
                <div
                  id="middle-panel"
                  className="card p-2 m-2"
                  style={this.panelStyle}
                >
                    Tags middle panel
                </div>
              </div>

              <div className="col-lg-4">
                <div
                  id="right-panel"
                  className="d-flex flex-column p-2 m-2"
                  style={this.panelStyle}
                >
                  <div className="card-title">Trending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tags;
