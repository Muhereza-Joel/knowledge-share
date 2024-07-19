import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import {
  setActiveLink,
} from "../redux/reducers/uiSlice";

const LeftSideBar = (props) => {
  const dispatch = useDispatch();
  const {activeLink} = useSelector((state) => state.ui);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

  const linkStyle = {
    backgroundColor: "#217537",
    color: "#fff",
    borderRadius: "0px 50px 50px 0px",
    boxShadow: "0px 0px 5px 3px rgba(0,0,0,0.1)",
    padding: "13px 0 13px 0",
  };

  return (
    <div className="sidebar">
      <div className="d-flex flex-column pe-4 mt-2">
        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "ask-question" ? "active" : ""
          }`}
          style={activeLink === "ask-question" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/questions/ask-question/`}
            className="px-3 fw-bold"
            onClick={() => dispatch(setActiveLink("ask-question"))}
          >
            <i className="bi bi-question-circle-fill me-2"></i> Ask Question
          </Nav.Link>
        </Nav.Item>

        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "my-questions" ? "active" : ""
          }`}
          style={activeLink === "my-questions" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/my-questions/`}
            className="px-3 fw-bold"
            onClick={() => dispatch(setActiveLink("my-questions"))}
          >
            <i className="bi bi-journal-text me-2"></i> My Questions
          </Nav.Link>
        </Nav.Item>

        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "all-questions" ? "active" : ""
          }`}
          style={activeLink === "all-questions" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/questions/`}
            className="px-3 fw-bold"
            onClick={() => dispatch(setActiveLink("all-questions"))}
          >
            <i className="bi bi-list-ul me-2"></i> All Questions
          </Nav.Link>
        </Nav.Item>

        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "calendar" ? "active" : ""
          }`}
          style={activeLink === "calendar" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/calendar/`}
            className="px-3 fw-bold"
            onClick={() => dispatch(setActiveLink("calendar"))}
          >
            <i className="bi bi-calendar3 me-2"></i> My Calendar
          </Nav.Link>
        </Nav.Item>

        <Nav.Item
          className={`d-flex align-items-center mt-3 ${
            activeLink === "tags" ? "active" : ""
          }`}
          style={activeLink === "tags" ? linkStyle : {}}
        >
          <Nav.Link
            href={`/knowledge-share/${cookieData.USERNAME_KEY}/tags/`}
            className="px-3 fw-bold"
            onClick={() => dispatch(setActiveLink("tags"))}
          >
            <i className="bi bi-tags me-2"></i> Tags
          </Nav.Link>
        </Nav.Item>

        {cookieData.USERROLE_KEY === "expert" && (
          <>
            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "create-products" ? "active" : ""
              }`}
              style={activeLink === "create-products" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/products/create-new/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("create-products"))}
              >
                <i className="bi bi-plus-circle-fill me-2"></i> Product Management
              </Nav.Link>
            </Nav.Item>

            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "products" ? "active" : ""
              }`}
              style={activeLink === "products" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/products/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("products"))}
              >
                <i className="bi bi-cart4 me-2"></i> All Products
              </Nav.Link>
            </Nav.Item>

            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "orders" ? "active" : ""
              }`}
              style={activeLink === "orders" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/products/orders/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("orders"))}
              >
                <i className="bi bi-receipt me-2"></i> All Orders
              </Nav.Link>
            </Nav.Item>
          </>
        )}

        {cookieData.USERROLE_KEY === "user" && (
          <>
            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "my-orders" ? "active" : ""
              }`}
              style={activeLink === "my-orders" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/products/my-orders/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("my-orders"))}
              >
                <i className="bi bi-bag-check me-2"></i> My Orders
              </Nav.Link>
            </Nav.Item>
          </>
        )}

        {cookieData.USERROLE_KEY === "admin" && (
          <>
            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "create-products" ? "active" : ""
              }`}
              style={activeLink === "create-products" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/products/create-new/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("create-products"))}
              >
                <i className="bi bi-plus-circle-fill me-2"></i> Product Management
              </Nav.Link>
            </Nav.Item>

            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "products" ? "active" : ""
              }`}
              style={activeLink === "products" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/products/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("products"))}
              >
                <i className="bi bi-cart4 me-2"></i> All Products
              </Nav.Link>
            </Nav.Item>

            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "orders" ? "active" : ""
              }`}
              style={activeLink === "orders" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/products/orders/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("orders"))}
              >
                <i className="bi bi-receipt me-2"></i> All Orders
              </Nav.Link>
            </Nav.Item>

            <Nav.Item
              className={`d-flex align-items-center mt-3 ${
                activeLink === "users" ? "active" : ""
              }`}
              style={activeLink === "users" ? linkStyle : {}}
            >
              <Nav.Link
                href={`/knowledge-share/users/`}
                className="px-3 fw-bold"
                onClick={() => dispatch(setActiveLink("users"))}
              >
                <i className="bi bi-people me-2"></i> Platform Users
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
