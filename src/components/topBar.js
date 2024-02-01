import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import SplitDropdown from "./SplitDropdown";

const TopBar = (props) => {

  const topPaneStyle = {
    width: "98vw",
    height: "7vh",
    zIndex: "3",
    position: "sticky",
    top: 0,
    backgroundColor: "#f6f9ff",
  };


  return (
    <div className="row p-3 g-0" style={topPaneStyle}>
      
          <div className="w-25">
            <h5>
              <span className="text-success">Knowledge</span>Share
            </h5>
          </div>

          <div className="w-50 d-flex">
          

            <h6 className="mx-4"></h6>
            <h6 className="mx-2 ml-4">Notifications</h6>
            <h6 className="mx-2">Settings</h6>
            <h6 className="mx-2">Profile</h6>
          </div>

          <div className="w-25 text-end">
            <SplitDropdown username={props.username}/>
          </div>
        
    </div>
  );
};

export default TopBar;
