import React, { useState, useEffect } from "react";
import { Button, Offcanvas, Form, Col, Row, Alert } from "react-bootstrap";
import API_BASE_URL from "./appConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const OrderCart = ({ product, show, handleClose, showToast }) => {

  const [quantity, setQuantity] = useState(1);
  const [amountDue, setAmountDue] = useState(product.price);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      setQuantity(1);
      setAmountDue(product.price);
      toast.error("Quantity must be a number greater than 0.");
    } else {
      setQuantity(newQuantity);
      setAmountDue(newQuantity * product.price);
    }
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    if (amountDue <= 0) {
      toast.error("Please specify a valid quantity to proceed with the order.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/orders/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          userId: cookieData.USERID_KEY,
          quantity,
          amountDue,
        }),
      });

      if (response.ok) {
        handleClose();
        showToast();
      } else {
        console.error("Failed to submit order:", response.statusText);
        toast.error("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error.message);
      toast.error("Failed to submit order. Please try again later.");
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" backdrop="static">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>You Are Ordering, {product.product_name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Alert variant="warning">
          Please note that the quantity you need to purchase should not exceed the available quantity.
        </Alert>
        <Form onSubmit={handleSubmitOrder}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextProductName">
            <Form.Label column sm="4">
              Available Quantity Now
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={product.quantity} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="4">
              Price
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly value={`Ugx ${product.price}`} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextQuantity">
            <Form.Label column sm="4">
              Quantity to purchase
            </Form.Label>
            <Col sm="8">
              <Form.Control type="number" value={quantity} onChange={handleQuantityChange} min="1" max={product.quantity} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextAmountDue">
            <Form.Label column sm="4">
              Amount Due
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly value={`Ugx ${amountDue}`} />
            </Col>
          </Form.Group>

          <Alert variant="info">
            Please go to my orders section and pay the amount due to complete the order.
          </Alert>

          <Button variant="success" size="sm" type="submit" disabled={amountDue <= 0}>
            Submit Order
          </Button>
          {" "}
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancel Order
          </Button>
        </Form>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OrderCart;
