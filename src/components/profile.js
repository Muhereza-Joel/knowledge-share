import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import ShortProfile from "./shortProfile";

const Profile = (props) => {
  const [isEditing, setIsEditing] = useState();
  const [isEditPassword, setIsEditingPassword] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/auth/get-avator/${localStorage.getItem("userId")}`
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
 
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditPasswordClick = () => {
    setIsEditingPassword(!isEditPassword);
  }

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
              <ShortProfile username={props.username} avatarUrl={avatarUrl}/>
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
                  value={props.username}
                  disabled={!isEditing}
                  className="form-control mb-3"
                />

                <label>Full Name:</label>
                <input
                  type="text"
                  value={props.fullName}
                  disabled={!isEditing}
                  className="form-control mb-3"
                />

                <label>Email:</label>
                <input
                  type="email"
                  value={props.email}
                  disabled={!isEditing}
                  className="form-control mb-3"
                />

                <div className="d-flex">
                  <div>
                    <label>Gender:</label>
                    <select value={props.gender}
                      disabled={!isEditing}
                      className="form-control mb-3">
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                    </select>
                    
                  </div>

                  <div className="mx-3">
                    <label>Date of Birth:</label>
                    <input
                      type="date"
                      value={props.dateOfBirth}
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
                      value={props.homeCountry}
                      disabled={!isEditing}
                      className="form-control mb-3"
                    />
                  </div>

                  <div className="mx-3">
                    <label>City:</label>
                    <input
                      type="text"
                      value={props.city}
                      disabled={!isEditing}
                      className="form-control mb-3"
                    />
                  </div>
                </div>
              </div>

              <div className="card mt-0 p-4" style={{ border: "none", backgroundColor: "#f6f9ff" }}>
                <small className="fw-bold mb-2">Account Information</small>
                <label>Password:</label>
                <input
                  type="text"
                  value={props.password}
                  disabled={!isEditPassword}
                  className="form-control mb-3"

                />
                  
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
};

export default Profile;
