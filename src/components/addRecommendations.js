import React from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import Categories from "./categories";

const AddRecommendations = (props) => {
  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0 px-2">
        <div className="col-sm-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-sm-10">
          <div className="card p-2">
            <div className="alert alert-info p-1 m-0">
              To add recommendations click on the category to get list of
              products, then select the desired product after add usage
              instractions..
            </div>
            <div className="row g-1">
              <div className="col-lg-3">
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecommendations;
