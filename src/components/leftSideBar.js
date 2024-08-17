import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setActiveLink } from "../redux/reducers/uiSlice";

const LeftSideBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeLink } = useSelector((state) => state.ui);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

  const linkStyle = {
    backgroundColor: "#28a745",
    color: "#fff",
    borderRadius: "0px 50px 50px 0px",
    boxShadow: "0px 0px 5px 3px rgba(0,0,0,0.1)",
    padding: "13px 0 13px 0",
    cursor: "pointer",
  };


  return (
    <div className="sidebar">
      <div className="d-flex flex-column pe-4 mt-2">
        <h6
          className={`d-flex align-items-center mt-3 ps-4 ${
            activeLink === "ask-question" ? "active" : ""
          }`}
          style={activeLink === "ask-question" ? linkStyle : {}}
          onClick={() =>
            dispatch(
              setActiveLink("ask-question"),
              navigate(
                `/knowledge-share/${cookieData.USERNAME_KEY}/questions/ask-question/`
              )
            )
          }
        >
          <i className="bi bi-question-circle-fill me-2"></i> Ask Question
        </h6>

        <h6
          className={`d-flex align-items-center mt-3 ps-4 ${
            activeLink === "my-questions" ? "active" : ""
          }`}
          style={activeLink === "my-questions" ? linkStyle : {}}
          onClick={() =>
            dispatch(
              setActiveLink("my-questions"),
              navigate(
                `/knowledge-share/${cookieData.USERNAME_KEY}/my-questions/`
              )
            )
          }
        >
          <i className="bi bi-journal-text me-2"></i> My Questions
        </h6>

        <h6
          className={`d-flex align-items-center mt-3 ps-4 ${
            activeLink === "all-questions" ? "active" : ""
          }`}
          style={activeLink === "all-questions" ? linkStyle : {}}
          onClick={() =>
            dispatch(
              setActiveLink("all-questions"),
              navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/questions/`)
            )
          }
        >
          <i className="bi bi-journals me-2"></i> All Questions
        </h6>

        <h6
          className={`d-flex align-items-center mt-3 ps-4 ${
            activeLink === "calendar" ? "active" : ""
          }`}
          style={activeLink === "calendar" ? linkStyle : {}}
          onClick={() =>
            dispatch(
              setActiveLink("calendar"),
              navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/calendar/`)
            )
          }
        >
          <i className="bi bi-calendar3 me-2"></i> My Calendar
        </h6>

        <h6
          className={`d-flex align-items-center mt-3 ps-4 ${
            activeLink === "tags" ? "active" : ""
          }`}
          style={activeLink === "tags" ? linkStyle : {}}
          onClick={() =>
            dispatch(
              setActiveLink("tags"),
              navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/tags/`)
            )
          }
        >
          <i className="bi bi-tags me-2"></i> Tags
        </h6>

        {cookieData.USERROLE_KEY === "expert" && (
          <>
            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "create-products" ? "active" : ""
              }`}
              style={activeLink === "create-products" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("create-products"),
                  navigate(`/knowledge-share/products/create-new/`)
                )
              }
            >
              <i className="bi bi-plus-circle-fill me-2"></i> Product Management
            </h6>

            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "products" ? "active" : ""
              }`}
              style={activeLink === "products" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("products"),
                  navigate(`/knowledge-share/products/`)
                )
              }
            >
              <i className="bi bi-cart4 me-2"></i> All Products
            </h6>

            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "orders" ? "active" : ""
              }`}
              style={activeLink === "orders" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("orders"),
                  navigate(`/knowledge-share/products/orders/`)
                )
              }
            >
              <i className="bi bi-receipt me-2"></i> All Orders
            </h6>
          </>
        )}

        {cookieData.USERROLE_KEY === "user" && (
          <>
            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "my-orders" ? "active" : ""
              }`}
              style={activeLink === "my-orders" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("my-orders"),
                  navigate(
                    `/knowledge-share/products/my-orders/`
                  )
                )
              }
            >
              <i className="bi bi-bag-check me-2"></i> My Orders
            </h6>
          </>
        )}

        {cookieData.USERROLE_KEY === "admin" && (
          <>
            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "create-products" ? "active" : ""
              }`}
              style={activeLink === "create-products" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("create-products"),
                  navigate(`/knowledge-share/products/create-new/`)
                )
              }
            >
              <i className="bi bi-plus-circle-fill me-2"></i> Product Management
            </h6>

            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "products" ? "active" : ""
              }`}
              style={activeLink === "products" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("products"),
                  navigate(`/knowledge-share/products/`)
                )
              }
            >
              <i className="bi bi-cart4 me-2"></i> All Products
            </h6>

            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "orders" ? "active" : ""
              }`}
              style={activeLink === "orders" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("orders"),
                  navigate(`/knowledge-share/products/orders/`)
                )
              }
            >
              <i className="bi bi-receipt me-2"></i> All Orders
            </h6>

            <h6
              className={`d-flex align-items-center mt-3 ps-4 ${
                activeLink === "users" ? "active" : ""
              }`}
              style={activeLink === "users" ? linkStyle : {}}
              onClick={() =>
                dispatch(
                  setActiveLink("users"),
                  navigate(`/knowledge-share/users/`)
                )
              }
            >
              <i className="bi bi-people me-2"></i> Platform Users
            </h6>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
