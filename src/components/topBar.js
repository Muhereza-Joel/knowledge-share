import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Badge } from "react-bootstrap";
import SplitDropdown from "./SplitDropdown";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../assets/images/logo.png";
import NotificationsModal from "./NotificationsModal";
import SearchBar from "./SearchBar";


const TopBar = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/questions/notifications/${cookieData.USERID_KEY}`);
        const data = await response.json();
        setNotificationsData(data.filter(notification => notification.isSeen === 0));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [cookieData.USERID_KEY]);

  const handleNotificationsClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await fetch(`http://localhost:3001/api/v1/questions/notifications/mark-seen/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationId: notificationId,
          userId: cookieData.USERID_KEY,
        })
      });
      setNotificationsData(notificationsData.filter(notification => notification.notificationId !== notificationId));
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  const handleSearch = (query, filter) => {
    console.log(`Search query: ${query}, filter: ${filter}`);
    // Implement search functionality here
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
          <img src={logo} alt="logo" style={{ marginTop: "-4px", width: 35, height: 35 }} /> <span className="text-success">Knowledge</span>Share
        </h5>
      </div>

      <div className="col-md-6">
        <SearchBar />
      </div>

      <div className="col-md-2 d-flex align-items-center justify-content-end">
        <h6 className="mx-2" style={notificationLinkStyle} onClick={handleNotificationsClick}>
          Notifications <Badge bg="success">{notificationsData.length}</Badge>
        </h6>
        
        <h6 className="mx-2" style={{ marginTop: "-5px", cursor: "pointer" }} onClick={() => { navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/messages/`) }}>Messages</h6>
      </div>

      <div className="col-md-2 d-flex align-items-center justify-content-end" style={{ marginTop: "-5px" }}>
        <SplitDropdown username={props.username} />
      </div>

      <NotificationsModal
        notifications={notificationsData}
        show={showNotifications}
        handleClose={handleCloseNotifications}
        handleNotificationClick={handleNotificationClick}
      />
    </div>
  );
};

export default TopBar;
