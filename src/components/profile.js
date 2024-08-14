import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import ShortProfile from "./shortProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/reducers/userSlice";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { isEditingProfile, isEditingProfilePassword } = useSelector((state) => state.ui);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [isEditing, setIsEditing] = useState();
  const [isEditPassword, setIsEditingPassword] = useState();
  const { id, avator, username, fullname, dateOfBirth, phoneNumber, email, gender, homeCountry, city, password } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({})


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
              <ShortProfile username={props.username} avatarUrl={avator} />
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
                  value={username}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={fullname}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
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
                      value={phoneNumber}
                      disabled={!isEditing}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                    />
                    <label>Gender:</label>
                    <select
                      value={gender}
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
                      value={dateOfBirth}
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
                      value={homeCountry}
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
                      value={city}
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
                  value={password}
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
