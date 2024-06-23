import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Badge } from "react-bootstrap"; // Import Badge component
import SplitDropdown from "./SplitDropdown";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../assets/images/logo.png";
import NotificationsModal from "./NotificationsModal";

const TopBar = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false); // State for modal display
  const [notificationsData, setNotificationsData] = useState([]); // State for notifications data

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/questions/notifications/${cookieData.USERID_KEY}`);
        const data = await response.json();
        setNotificationsData(data.filter(notification => notification.isSeen === 0)); // Filter notifications where isSeen is 0
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [cookieData.USER_ID]); // Fetch notifications when USER_ID changes

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
      // Update notifications data after marking as seen
      setNotificationsData(notificationsData.filter(notification => notification.notificationId !== notificationId));
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  const topPaneStyle = {
    width: "99.99%",
    height: "8vh",
    zIndex: "3",
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    // backgroundColor: "#f6f9ff",
    boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
  };

  const notificationLinkStyle = {
    cursor: "pointer",
    marginRight: "10px", // Adjust margin as needed
    position: "relative",
  };

  return (
    <div className="row p-3 g-0" style={topPaneStyle}>
      <div className="w-25">
        <h5>
          <img src={logo} style={{width: 35, height: 35}}/> <span className="text-success">Knowledge</span>Share
        </h5>
      </div>

      <div className="w-50 d-flex">
        <h6 className="mx-2 ml-4" style={notificationLinkStyle} onClick={handleNotificationsClick}>
          Notifications <Badge bg="success">{notificationsData.length}</Badge> |
        </h6>
        
        <h6 className="mx-2" style={{cursor: "pointer"}} onClick={() => {navigate(`/knowledge-share/${cookieData.USERNAME_KEY}/profile/`)}}>Profile</h6>
      </div>

      <div className="w-25 text-end">
        <SplitDropdown username={props.username}/>
      </div>

      {/* Notification Modal */}
      <NotificationsModal
        notifications={notificationsData}
        show={showNotifications}
        handleClose={handleCloseNotifications}
        handleNotificationClick={handleNotificationClick} // Pass the handler to the modal
      />
    </div>
  );
};

export default TopBar;
