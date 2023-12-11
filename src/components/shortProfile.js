import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Avator from "../assets/images/MyImage.jpg";
import { Nav } from "react-bootstrap";

class ShortProfile extends Component {
  state = {
    username: "Muhereza-Joel",
  };
  style = {
    width: "100% !important",
  };

  avatorStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    border: "10px solid #fafcfd",
  };

  render() {
    return (
      <div className="mt-2 mx-3" style={this.style}>
        <img
          src={Avator}
          style={this.avatorStyle}
          className="rounded-circle"
          alt="avator"
        />

        <div className="d-flex justify-content-center">
          <span className="text-center" >  
            Signed In As
            <div className="h4 text-center">Muhereza Joel</div>
          </span>
        </div>

        <div className="d-flex flex-row justify-content-center">
          <div className="mx-2">0 Followers</div>
          <div className="mx-2">0 Following</div>
        </div>
        <Nav.Item className="mt-3 text-center">
          <Nav.Link
            href={`/knowledge-share/${this.state.username}/edit-profile/`}
            className="text-info px-2 fw-bold"
          >
            <button className="btn btn-sm btn-secondary">
              Edit Profile
            </button>
          </Nav.Link>
        </Nav.Item>
      </div>
    );
  }
}

export default ShortProfile;
