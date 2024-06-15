import React from "react";
import TopBar from "./topBar";

const Products = (props) => {
  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return <>
    <div style={style}>
        <TopBar username={props.username}/>
    </div>
  </>;
};

export default Products;
