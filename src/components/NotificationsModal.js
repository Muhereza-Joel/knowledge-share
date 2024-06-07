import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import moment from "moment";

const NotificationModal = ({ notifications, show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-dialog-notification"
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
