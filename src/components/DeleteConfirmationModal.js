import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this question?
        <div className='alert alert-danger text-danger mt-2'>Note that this is a dangerous action because all answers, comments and replies attached to this question will be deleted as well.</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size='sm' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" size='sm' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
