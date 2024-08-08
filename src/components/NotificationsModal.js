import React from "react";
import { Offcanvas, Button, Alert } from "react-bootstrap";
import moment from "moment";

const NotificationOffcanvas = ({
  notifications,
  show,
  handleClose,
  handleNotificationClick,
}) => {
  return (
    <Offcanvas
      backdrop={false}
      show={show}
      onHide={handleClose}
      placement="start"
      className="w-25 h-100 notification-offcanvas"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="notification-content">
          <div className="card">
            <div className="card-title ms-3 mt-1 fw-bold">New Questions Notifications</div>
            <div className="card-body">
              {notifications.length === 0 && (
                <div className="text-muted">
                  No new notifications for questions
                </div>
              )}
              {notifications.length > 0 && (
                <div className="text-muted">
                  {notifications.map((notification) => (
                    <div key={notification.notificationId}>
                      <Alert variant="light" className="px-2 py-1">
                        <a
                          href={notification.questionUrl}
                          onClick={() =>
                            handleNotificationClick(notification.notificationId)
                          }
                          className="text-decoration-none"
                        >
                          {notification.notificationMessage} by{" "}
                          <span className="text-success">
                            {notification.notifierUsername}
                          </span>
                        </a>
                        <span className="text-muted">
                          {" "}
                          - {moment(notification.createdAt).fromNow()}
                        </span>
                      </Alert>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotificationOffcanvas;
