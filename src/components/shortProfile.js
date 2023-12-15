import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Avator from "../assets/images/MyImage.jpg";
import { Nav } from "react-bootstrap";

class ShortProfile extends Component {
  constructor(props){
      super(props);
      this.state = {
        
      };
  }

  style = {
    width: "100% !important",
  };

  avatorStyle = {
    width: "80%",
    height: "80%",
    objectFit: "cover",
    border: "10px solid #fafcfd",
    marginTop: "1rem",
  };

  render() {
    const username = this.props.username;

    return (
      <div className="mt-0 mx-3 text-center" style={this.style}>
        <img
          src={Avator}
          style={this.avatorStyle}
          className="rounded-circle"
          alt="avator"
        />

        <div className="d-flex justify-content-center">
          <span className="text-center" >  
            Signed In As
            <div className="h4 text-center">{username}</div>
          </span>
        </div>

        <div className="d-flex flex-row justify-content-center">
          <div className="mx-2">0 Followers</div>
          <div className="mx-2">0 Following</div>
        </div>
        
      </div>
    );
  }
}

export default ShortProfile;
