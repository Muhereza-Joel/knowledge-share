import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ImageZoom = ({ imageUrl, altText, height, width, objectFit }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="card mx-2 mb-3">
        <img
          src={imageUrl}
          alt={altText}
          height={height}
          width={width}
          objectFit={objectFit}
          className="mx-3 mb-2"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        />
      </div>

      <Modal show={show} onHide={handleClose} centered size="md">
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
