import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import LeftSideBar from "./leftSideBar";
import { Table, Modal, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import "datatables.net-bs4";
import API_BASE_URL from "./appConfig";

const MyOrders = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const userCookie = Cookies.get("knowledgeshare");
  const userDataFromCookie = JSON.parse(userCookie);

  useEffect(() => {
    if (userCookie) {
      try {
        const userDataFromCookie = JSON.parse(userCookie);

        setRole(userDataFromCookie.role);
        setUserId(userDataFromCookie.USERID_KEY);
        setUsername(userDataFromCookie.username);
        setEmail(userDataFromCookie.email);

        if (typeof userDataFromCookie === "object") {
        } else {
          console.error("Invalid user data format in the cookie");
        }
      } catch (error) {
        console.error("Error parsing JSON from the cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const table = $("#ordersTable").DataTable({
        destroy: true,
        data: orders,
        columns: [
          { data: "sno" },
          { data: "fullname" },
          { data: "phone_number" },
          { data: "product_name" },
          { data: "quantity" },
          { data: "amount" },
          { data: "status" },
          {
            data: null,
            render: function (data, type, row) {
              if (row.status == "not-paid" && row.user_id == userDataFromCookie.USERID_KEY) {
                return `
                  <div class="dropdown">
                    <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionDropdown${row.id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Select Action
                    </button>
                    <div class="dropdown-menu" aria-labelledby="actionDropdown${row.id}">
                      <a href="#pay-order" class="dropdown-item pay-order" data-id="${row.id}" data-amount="${row.amount}">Pay Out Order</a>
                    </div>
                  </div>
                `;
              } else {
                return `
                  <div class="dropdown">
                    <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionDropdown${row.id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
                      No Actions Available
                    </button>
                  </div>
                `;
              }
            },
          },
        ],
        columnDefs: [
          {
            targets: [7], // Index of 'Actions' column
            orderable: false, // Disable sorting for actions column
          },
        ],
      });

      // Handle action clicks using jQuery
      $("#ordersTable tbody").on("click", ".pay-order", function () {
        const orderId = $(this).attr("data-id");
        const amount = $(this).attr("data-amount");
        initiatePayment(orderId, amount);
      });

      return () => {
        table.destroy();
      };
    }
  }, [orders]);

  const initiatePayment = async (orderId, amount) => {
    try {
      setShowModal(true);
      const authResponse = await fetch(
        "https://pay.pesapal.com/v3/api/Auth/RequestToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            consumer_key: "FtbOMHLJajpDeghNZks6g0uLi8GjGcBf",
            consumer_secret: "7nTLRqzlVZSkagTDvi7jChURQaU=",
          }),
        }
      );

      if (authResponse.ok) {
        const authResponseData = await authResponse.json();

        Cookies.set(
          "knowledgeshare-pesapal",
          JSON.stringify({
            authToken: authResponseData.token,
          })
        );

        const ipnRegistrationResponse = await fetch(
          "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${authResponseData.token}`,
            },
            body: JSON.stringify({
              url: "http://localhost:3000/knowledge-share/products/orders/payments/complete/",
              ipn_notification_type: "GET",
            }),
          }
        );

        if (ipnRegistrationResponse.ok) {
          const ipnData = await ipnRegistrationResponse.json();

          const orderRequest = await fetch(
            "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authResponseData.token}`,
              },
              body: JSON.stringify({
                id: orderId,
                currency: "UGX",
                amount: amount,
                description: "KnowledgeShare Order Payment",
                callback_url:
                  "http://localhost:3000/knowledge-share/products/orders/payments/complete/",
                notification_id: ipnData.ipn_id,
                billing_address: {
                  email_address: email,
                  phone_number: "",
                  country_code: "256",
                  first_name: username,
                  middle_name: "",
                  last_name: "",
                  line_1: "",
                  line_2: "",
                  city: "",
                  state: "",
                  postal_code: null,
                  zip_code: null,
                },
              }),
            }
          );

          if (orderRequest.ok) {
            const requestData = await orderRequest.json();
            const transactionResponse = await fetch(
              "http://localhost:3001/api/v1/payments/add",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  currency: "UGX",
                  amount: amount,
                  tracking_id: requestData.order_tracking_id,
                  order_id: orderId,
                }),
              }
            );

            if (transactionResponse.ok) {
              const transactionData = await transactionResponse.json();
              if (transactionData) {
                setShowModal(false);
                navigate(
                  `/knowledge-share/products/orders/makepayment?orderId=${orderId}&url=${requestData.redirect_url}`
                );
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowModal(false);
      toast.error("Failed to connect to the server...", {
        style: { backgroundColor: "#fcd0d0", color: "#333" },
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/orders/my-orders?id=${userDataFromCookie.USERID_KEY}`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((order, index) => ({
          ...order,
          sno: index + 1,
        }));
        setOrders(formattedData);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      toast.error("Failed to fetch orders. Please try again later.");
    }
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "100vh",
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-sm-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-sm-10 py-2 card mt-3">
          <div className="card-body">
            <hr />
            <Table striped bordered hover id="ordersTable">
              <thead>
                <tr>
                  <th>SNo</th>
                  <th>Customer</th>
                  <th>Phone Number</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Amount Due</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.sno}</td>
                    <td>{order.fullname}</td>
                    <td>{order.phone_number}</td>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.amount}</td>
                    <td>{order.status}</td>
                    <td>Actions</td> {/* Actions column handled by DataTables */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
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
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Processing Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className="ms-3">Please wait while we initiate your payment...</span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyOrders;
