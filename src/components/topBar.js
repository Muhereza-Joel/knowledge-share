import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import SplitDropdown from "./SplitDropdown";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../assets/images/logo.png"

const TopBar = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const navigate = useNavigate();

  const topPaneStyle = {
    width: "99.99%",
    height: "7vh",
    zIndex: "3",
    position: "sticky",
    top: 0,
    backgroundColor: "#f6f9ff",
    // boxShadow: "0px 1px 4px 2px rgba(0,0,0,0.1)",
  };


  return (
    <div className="row p-3 g-0" style={topPaneStyle}>
      
          <div className="w-25">
            <h5>
             <img src={logo} style={{width: 35, height: 35}}/> <span className="text-success">Knowledge</span>Share
            </h5>
          </div>

          <div className="w-50 d-flex">
          

            <h6 className="mx-4"></h6>
            <h6 className="mx-2 ml-4">Notifications |</h6>
            <h6 className="mx-2 ml-4">Messages |</h6>
            {/* <h6 className="mx-2">Settings |</h6> */}
            <h6 className="mx-2" style={{cursor: "pointer"}} onClick={() => {navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/profile/`)}}>Profile</h6>
          </div>

          <div className="w-25 text-end">
            <SplitDropdown username={props.username}/>
          </div>
        
    </div>
  );
};

export default TopBar;
