import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import ShortProfile from "./shortProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  clearSuccess,
  clearError,
  handleProfileUpdate,
} from "../redux/reducers/userSlice";

const Profile = (props) => {
  const dispatch = useDispatch();
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [isEditing, setIsEditing] = useState();
  const {
    id,
    avator,
    username,
    fullname,
    dateOfBirth,
    phoneNumber,
    email,
    gender,
    homeCountry,
    city,
    success,
    error,
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    homeCountry: "",
    city: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setFormData({
      username: username,
      fullname: fullname,
      email: email,
      gender: gender,
      dateOfBirth: dateOfBirth,
      homeCountry: homeCountry,
      city: city,
      phoneNumber: phoneNumber,
    });
  }, [
    username,
    fullname,
    email,
    gender,
    dateOfBirth,
    homeCountry,
    city,
    phoneNumber,
  ]);

  const handleEditClick = async () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      dispatch(handleProfileUpdate(formData));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    dispatch(updateUserData(updatedFormData));
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
              className="col-lg-4 card mt-4"
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
              </div>
            </div>
            <div className="col-lg-8">
              <div
                className="card mt-4 p-4"
                style={{ border: "none", backgroundColor: "#f6f9ff" }}
              >
                <small className="fw-bold mb-2">Personal Information</small>
                <div className="alert alert-info">
                  This is your public profile, make it vivid enough and
                  appealing to your followers.
                </div>

                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="form-control "
                />

                <small className="text-secondary mb-3">
                  This username cannot be changed, its unique to you.
                </small>

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
