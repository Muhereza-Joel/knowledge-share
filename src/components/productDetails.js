import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const ProductDetails = ({ product, viewProduct, onPlaceOrder, onClose }) => {
  const [showModal, setShowModal] = useState(viewProduct);

  useEffect(() => {
    setShowModal(viewProduct);
  }, [viewProduct]);

  const handleClose = () => {
    setShowModal(false);
    onClose(); // Notify parent component that modal is closed
  };

  const handlePlaceOrder = () => {
    onPlaceOrder(product); // Call the onPlaceOrder callback with the selected product
    handleClose(); // Close the modal after placing the order
  };

  const handleShow = () => setShowModal(true);

  return (
    <>
      <Modal show={showModal} size="xl" onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{product.product_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Product Description:</strong>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: product.product_description }}
          />
          <p>
            <strong>Sale Price:</strong> {product.price}
          </p>
          <p>
            <strong>Product Category:</strong> {product.categories}
          </p>
          <p>
            <strong>Quantity Available:</strong> {product.quantity}
          </p>
          <div>
            {product.image_urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Product"
                style={{
                  width: "200px",
                  height: "200px",
                  marginRight: "8px",
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" size="sm" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetails;
