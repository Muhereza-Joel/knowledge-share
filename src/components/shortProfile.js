import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Avator from "../assets/images/avator.jpg";
import { Button } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { BsSave2Fill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "./appConfig";

const ShortProfile = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayedImage, setDisplayedImage] = useState(null);

  const style = {
    width: "100% !important",
  };

  const avatorStyle = {
    width: "250px",
    height: "250px",
    objectFit: "cover",
    border: "2px solid #299ea6",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fff",
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setDisplayedImage(e.target.result);
      };

      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleAvatarChange = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      formData.append("userId", localStorage.getItem("userId"));

      // Make a fetch request to your backend to save the photo
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/change-avator`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const newAvatarUrl = await response.json();
          // Save the URL to localStorage
          localStorage.setItem("avatarUrl", newAvatarUrl.url);

          toast.success("Prifile picture changed, successfully", {
            style: { backgroundColor: "#cce6e8", color: "#333" },
          });
        } else {
          toast.error("Failed to change profile picture", {
            style: { backgroundColor: "#fcd0d0", color: "#333" },
          });
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
  };

  const { username, avatarUrl } = props;

  return (
    <div className="mt-0 mx-3 text-center" style={style}>
      <img
        src={displayedImage || avatarUrl || Avator}
        style={avatorStyle}
        className="rounded-circle"
        alt="avatar"
      />

      <div className="d-flex justify-content-center">
        <span className="text-center">
          Signed In As
          <div className="h4 text-center">{username}</div>
        </span>
      </div>

      <div className="d-flex flex-row justify-content-center">
        <div className="mx-2">0 Followers</div>
        <div className="mx-2">0 Following</div>
      </div>

      <div>
        {/* Button for changing avatar */}
        <div style={{ position: "absolute", top: 100, right: 10 }}>
          <div className="d-flex flex-column">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <Button
              variant="secondary"
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              <BsUpload />
            </Button>
            <Button variant="primary my-2" onClick={handleAvatarChange}>
              <BsSave2Fill title="Save Photo" />
            </Button>
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
  );
};

export default ShortProfile;
