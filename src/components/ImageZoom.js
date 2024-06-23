import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ImageZoom = ({ imageUrl, altText }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="card mx-2 mb-3">
        <img
          src={imageUrl}
          alt={altText}
          className="img-fluid mx-3 mb-2"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        />
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body>
          <img
            src={imageUrl}
            alt={altText}
            className="img-fluid"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageZoom;
