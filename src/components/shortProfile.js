import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Avator from "../assets/images/avator.jpg";
import { Button } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { BiSolidSave } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "./appConfig";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAvatorChange,
  clearSuccess,
  clearError,
} from "../redux/reducers/userSlice";

const ShortProfile = (props) => {
  const dispatch = useDispatch();
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const { success, error } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (success) {
      toast.success(success, {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });

      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: { backgroundColor: "#fcd0d0", color: "#333" },
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const { avatarUrl } = props;

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
          <div className="h4 text-center">{cookieData.USERNAME_KEY}</div>
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
            <Button
              variant="success my-2"
              onClick={() => dispatch(handleAvatorChange(selectedFile))}
            >
              <BiSolidSave title="Save Photo" style={{ fontSize: 25 }} />
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
