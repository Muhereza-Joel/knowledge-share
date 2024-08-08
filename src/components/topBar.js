import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Badge } from "react-bootstrap";
import SplitDropdown from "./SplitDropdown";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/images/logo.png";
import NotificationsModal from "./NotificationsModal";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNewQuestionNotifications,
  markNewQuestionNotificationSeen,
  setShowNotifications,
} from "../redux/reducers/notificationsSlice";

const TopBar = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newQuestionNotifications, showNotifications } = useSelector(
    (state) => state.notifications
  );

  //Should fetch notifications on page load, doesn't need dependency array
  useEffect(() => {
    dispatch(fetchNewQuestionNotifications());
  }, []);

  const handleNotificationsClick = () => {
    dispatch(setShowNotifications(true));
  };

  const handleCloseNotifications = () => {
    dispatch(setShowNotifications(false));
  };

  const handleNotificationClick = async (notificationId) => {
    const validNotificationId =
      sanitizeAndValidateNotificationId(notificationId);
    dispatch(markNewQuestionNotificationSeen(validNotificationId));
  };

  const sanitizeAndValidateNotificationId = (notificationId) => {
    const sanitizedId = String(notificationId).replace(/[^a-zA-Z0-9-]/g, "");
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(sanitizedId)) {
      throw new Error("Invalid notification ID");
    }

    return sanitizedId;
  };

  const topPaneStyle = {
    width: "99.99%",
    height: "8vh",
    zIndex: "3",
    position: "sticky",
    top: 0,
    backgroundColor: "#f6f9ff",
    borderBottom: "1px solid #e5e5e5",
  };

  const notificationLinkStyle = {
    cursor: "pointer",
    marginRight: "0px",
    marginTop: "-5px",
    position: "relative",
  };

  const contentStyle = {
    display: "flex",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div className="row p-3 g-0" style={topPaneStyle}>
      <div className="col-md-2 d-flex align-items-center">
        <h5>
          <img
            src={logo}
            alt="logo"
            style={{ marginTop: "-4px", width: 35, height: 35 }}
          />{" "}
          <span className="text-success">Knowledge</span>Share
        </h5>
      </div>

      <div className="col-md-6">
        <SearchBar />
      </div>

      <div className="col-md-2 d-flex align-items-center justify-content-end">
        <h6
          className="mx-2"
          style={notificationLinkStyle}
          onClick={handleNotificationsClick}
        >
          Notifications{" "}
          <Badge bg="success">{newQuestionNotifications.length}</Badge>
        </h6>

        <h6
          className="mx-2"
          style={{ marginTop: "-5px", cursor: "pointer" }}
          onClick={() => {
            navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/messages/`);
          }}
        >
          Messages
        </h6>
      </div>

      <div
        className="col-md-2 d-flex align-items-center justify-content-end"
        style={{ marginTop: "-5px" }}
      >
        <SplitDropdown username={props.username} />
      </div>

      <NotificationsModal
        notifications={newQuestionNotifications}
        show={showNotifications}
        handleClose={handleCloseNotifications}
        handleNotificationClick={handleNotificationClick}
      />
    </div>
  );
};

export default TopBar;
