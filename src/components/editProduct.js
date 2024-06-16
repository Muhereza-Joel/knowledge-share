import React from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";

const EditProduct = (props) => {
  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
        <TopBar username={props.username}/>
        <div className="row g-0">
            <div className="col-sm-2">
                <LeftSideBar username={props.username}/>
            </div>
            <div className="col-sm-10"></div>
        </div>
    </div>
  );
};

export default EditProduct;
