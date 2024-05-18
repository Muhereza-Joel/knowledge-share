import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import ShortProfile from "./shortProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";


const Profile = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [isEditing, setIsEditing] = useState();
  const [isEditPassword, setIsEditingPassword] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");

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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/profile/${cookieData.USERID_KEY}`
        );

        if (response.ok) {
          const profileDataArray = await response.json();
          if (Array.isArray(profileDataArray) && profileDataArray.length > 0) {
            const profileData = profileDataArray[0];

            // Extract only the date part from the dob property
            const dateOnly = profileData.dob ? profileData.dob.substring(0, 10) : null;
            
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
          `${API_BASE_URL}/api/v1/auth/get-avator/${cookieData.USERID_KEY}`
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

  const handleEditClick = async () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/profile`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // Add any other headers needed for authentication
            },
            body: JSON.stringify({
              username: formData.username,
              fullname: formData.fullname,
              email: formData.email,
              gender: formData.gender,
              dateOfBirth: formData.dateOfBirth,
              homeCountry: formData.homeCountry,
              city: formData.city,
              phoneNumber: formData.phoneNumber,
              userId: cookieData.USERID_KEY,
            }),
          }
        );

        if (response.ok) {
          const {message} = response;
          toast.success(`Profile updated successfully`, {
            style: { backgroundColor: "#cce6e8", color: "#333" },
          });
          setIsEditing(false);
        } else {
          const {message} = response;
          toast.error(`Failed to update profile`, {
            style: { backgroundColor: "#fcd0d0", color: "#333" },
          });
        }
      } catch (error) {
        console.error("Error during profile update:", error);
      }
    }
  };

  const handleEditPasswordClick = () => {
    setIsEditingPassword(!isEditPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-lg-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-lg-8">
          <div className="row g-0">
            <div
              className="col-lg-5 card mt-4"
              style={{ border: "none", backgroundColor: "#f6f9ff" }}
            >
              <ShortProfile username={props.username} avatarUrl={avatarUrl} />
              <div className="text-center mt-4">
                <button
                  onClick={handleEditClick}
                  className="btn btn-primary btn-sm"
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>

                <button
                  onClick={handleEditPasswordClick}
                  className="btn btn-primary btn-sm mx-2"
                >
                  {isEditPassword ? "Save Changes" : "Change Password"}
                </button>
              </div>
            </div>
            <div className="col-lg-7">
              <div
                className="card mt-4 p-4"
                style={{ border: "none", backgroundColor: "#f6f9ff" }}
              >
                <small className="fw-bold mb-2">Personal Information</small>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-control mb-3"
                />

                <div className="d-flex">
                  <div>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      disabled={!isEditing}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                    />
                    <label>Gender:</label>
                    <select
                      value={formData.gender}
                      name="gender"
                      onChange={(e) => handleInputChange(e)}
                      disabled={!isEditing}
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
                      type={!isEditing ? "text" : "date"}
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
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
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="form-control mb-3"
                    />
                  </div>

                  <div className="mx-3">
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="form-control mb-3"
                    />
                  </div>
                </div>
              </div>

              <div
                className="card mt-0 p-4"
                style={{ border: "none", backgroundColor: "#f6f9ff" }}
              >
                <small className="fw-bold mb-2">Account Information</small>
                <label>Password:</label>
                <input
                  type="text"
                  value={props.password}
                  disabled={!isEditPassword}
                  className="form-control mb-3"
                />
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
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
};

export default Profile;
