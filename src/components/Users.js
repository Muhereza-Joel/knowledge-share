import React, { useEffect, useState } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import DataTable from "./datatable";
import API_BASE_URL from "./appConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "react-bootstrap";

const Users = (props) => {
  const [data, setData] = useState([]);
  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "100vh",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/users`);

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          toast.error("Error deleting event. Please try again.", {
            style: { backgroundColor: "#fcd0d0", color: "#333" },
          });
        }
      } catch (error) {
        console.error("Error fetching plartform users:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={style}>
      <TopBar username={props.username} />

      <div className="row g-0">
        <div className="col-lg-2">
          <div style={{ position: "fixed", top: "50px", width: "18%" }}>
            <LeftSideBar username={props.username} />
          </div>
        </div>

        <div className="col-lg-7">
          <DataTable data={data} />
        </div>

        <div className="col-lg-3 py-4 px-2">
          
          <Alert variant="light">
            <Alert.Heading>Expert Account Role.</Alert.Heading>
            <p>
              The expert account is used by experts to guide all users who post questions on this plartform, any user elevated to this 
              role will have the capacity to add drug recomendations to questions on the plartform.
            </p>
            
          </Alert>

          <Alert variant="light">
            <Alert.Heading>User Account Role.</Alert.Heading>
            <p>
              The user account is the default role for all users who post questions on this plartform. This role enables a user
              to post a question, add comments and submit replies to comments.
            </p>
            
          </Alert>


        </div>
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
  );
};

export default Users;
