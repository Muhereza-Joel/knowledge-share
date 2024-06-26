import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";

const MakePayment = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const url = queryParams.get("url");

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "100vh",
  };

  return (
    <>
      <div style={style}>
        <TopBar username={props.username} />
        <div className="row g-0">
          <div className="col-sm-2">
            <LeftSideBar username={props.username} />
          </div>

          <div className="col-sm-10 p-2 card mt-3">
            <h3> Please Select Your Preffered Mode of Payment</h3>
            <div className="alert alert-warning">
              <strong>Warning!</strong> Please note that payments are made in
              Uganda Shillings only..
            </div>
            <br />
            <iframe
              style={{ border: 0 }}
              src={url}
              width={"100%"}
              height={500}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakePayment;
