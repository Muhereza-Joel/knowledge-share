import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import Avator from "../assets/images/avator.jpg";
import { useParams } from "react-router-dom";
import API_BASE_URL from "./appConfig";

const ViewUser = (props) => {

  const [avatarUrl, setAvatarUrl] = useState("");

  const { userId } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/profile/${userId}`
        );

        if (response.ok) {
          const profileDataArray = await response.json();
          if (Array.isArray(profileDataArray) && profileDataArray.length > 0) {
            const profileData = profileDataArray[0];

            // Extract only the date part from the dob property
            const dateOnly = profileData.dob
              ? profileData.dob.substring(0, 10)
              : null;

            setFormData({
              username: profileData.username,
              fullname: profileData.fullname,
              email: profileData.email,
              gender: profileData.gender,
              dateOfBirth: dateOnly,
              homeCountry: profileData.country,
              city: profileData.city,
              phoneNumber: profileData.phone_number,
              password: profileData.password,
            });
          }
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/get-avator/${userId}`
        );

        if (response.ok) {
          const avatarData = await response.json();
          if (Array.isArray(avatarData) && avatarData.length > 0) {
            setAvatarUrl(avatarData[0].url);
          } else {
            console.error("Invalid avatar data structure");
          }
        } else {
          console.error("Failed to fetch avatarUrl");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchAvatarUrl();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    homeCountry: "",
    city: "",
    phoneNumber: "",
    password: "",
  });

  const avatorStyle = {
    width: "350px",
    height: "350px",
    objectFit: "cover",
    border: "2px solid #299ea6",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fff",
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "calc(100vh - 0px)",
    overflow: "auto"
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-lg-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-8">
          <div className="">
            <div className="row g-2">
              <div
                className="col-lg-5 card mt-3"
                style={{ border: "none", backgroundColor: "#f6f9ff" }}
              >
                <div className="card">
                  <div className="card-body">
                    <img
                      src={avatarUrl || Avator}
                      style={avatorStyle}
                      className="rounded-circle"
                      alt="avatar"
                    />

                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div
                  className="card mt-2 p-4"
                  
                >
                  <small className="fw-bold mb-2">Personal Information</small>
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    className="form-control mb-3"
                  />

                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    className="form-control mb-3"
                  />

                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="form-control mb-3"
                  />

                  <div className="d-flex">
                    <div>
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        className="form-control mb-3"
                      />
                      <label>Gender:</label>
                      <select
                        value={formData.gender}
                        name="gender"
                        className="form-control mb-3"
                      >
                        <option>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="mx-3">
                      <label>Date of Birth:</label>
                      <input
                        type="text"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        className="form-control mb-3"
                      />
                    </div>
                  </div>

                  <div className="d-flex">
                    <div>
                      <label>Home Country:</label>
                      <input
                        type="text"
                        name="homeCountry"
                        value={formData.homeCountry}
                        className="form-control mb-3"
                      />
                    </div>

                    <div className="mx-3">
                      <label>City:</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        className="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ViewUser;
