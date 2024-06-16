import React from "react";
import { Offcanvas, Button, Alert } from "react-bootstrap";
import moment from "moment";

const NotificationOffcanvas = ({ notifications, show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" className="notification-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="notification-content">
          {notifications.map((notification) => (
            <div key={notification.notificationId}>
              <Alert variant="light">
                <a href={notification.questionUrl} className="text-decoration-none">
                  {notification.notificationMessage} by <span className="text-success">{notification.notifierUsername}</span>
                </a>
                <span className="text-muted"> - {moment(notification.createdAt).fromNow()}</span>
              </Alert>
            </div>
          ))}
        </div>
      </Offcanvas.Body>
     
    </Offcanvas>
  );
};

export default NotificationOffcanvas;
