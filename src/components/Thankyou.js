import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";

const Thankyou = (props) => {
  const userCookie = Cookies.get("knowledgeshare-pesapal");
  const [data, setData] = useState([]);
  const userDataFromCookie = JSON.parse(userCookie);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const OrderTrackingId = queryParams.get("OrderTrackingId");
  const OrderMerchantReference = queryParams.get("OrderMerchantReference");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userDataFromCookie.authToken}`,
            },
          }
        );
        const data = await response.json();
        setData(data);

        // Assuming the necessary values are in the response data
        const updatePayload = {
          status: "COMPLETED",
          tracking_id: data.tracking_id,
          payment_method: data.payment_method,
          order_id: data.merchant_reference,
        };

        const updateResponse = await fetch(
          `http://localhost:3001/api/v1/payments/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatePayload),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update payment");
        }
      } catch (error) {
        console.error("Error transaction status or updating payment:", error);
      }
    };

    fetchData();
  }, []);

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "100vh",
  };

  return (
    <>
      <div style={style}>
        <TopBar username={props.username} />

        <div className="row g-0">
          <div className="col-sm-2">
            <LeftSideBar username={props.username} />
          </div>

          <div className="col-sm-10 py-2 card mt-3">
            <div className="alert alert-success">
              <hr />
              <h5>
                Payment received successfully, thankyou for paying out your
                order.
              </h5>
            </div>

            <h3>Here are details of the transaction</h3>
            <br />
            <h6>
              Method of Payment: <small> {data.payment_method}</small>
            </h6>
            <br />
            <h6>
              Amount Paid: <small> {data.amount}</small>
            </h6>
            <br />
            <h6>
              Transaction Status:{" "}
              <small> {data.payment_status_description}</small>
            </h6>
            <br />
            <h6>
              Confirmation Code: <small> {data.confirmation_code}</small>
            </h6>
            <br />
            <h6>
              Order Id: <small> {data.order_tracking_id}</small>
            </h6>
            <br />
            <h6>
              Order Reference: <small> {data.merchant_reference}</small>
            </h6>
            <br />
            <h6>
              Payment Account: <small> {data.payment_account}</small>
            </h6>
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
    </>
  );
};

export default Thankyou;
