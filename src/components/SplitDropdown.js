import React, {useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Nav } from "react-bootstrap";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";
import  Avatar  from "../assets/images/avator.jpg";
import API_BASE_URL from "./appConfig";
import Cookies from 'js-cookie';

const SplitDropdown = (props) => {
  const navigate = useNavigate();
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

  const [avatarUrl, setAvatarUrl] = useState("");
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
 

  const handleLogout = () => {
    logout();
    navigate("/logout");
  };

  const navigateToProfile = () => {
    navigate(`/knowledge-share/${props.username}/profile/`);
  }

  const handleNavigatioToHome = () => {
    navigate(`/knowledge-share/${props.username}/`);
  }

  const avatorStyle = {
    width: "30px",
    height: "30px",
    marginRight: "5px"
  }
  return (
    <Dropdown as={ButtonGroup}>
      <Button
        variant="secondary"
        style={{ backgroundColor: "#cce6e8", border: "none", color: "black", marginTop:"-10px" }}
        className="btn-sm fw-bold"
      >
        <img src={avatarUrl || Avatar} className="rounded-circle" style={avatorStyle}/>{props.username}
      </Button>

      <Dropdown.Toggle
        split
        variant="secondary"
        style={{ backgroundColor: "#ace6e8", border: "none", color: "black", marginTop:"-10px" }}
        id="dropdown-split-basic"
      />

      <Dropdown.Menu>
        <Dropdown.Item>
          <Nav.Item>
            <Nav.Link
              href={`/knowledge-share/${props.username}/`}
              className="text-info px-2 fw-bold text-dark"
              onClick={handleNavigatioToHome}
            >
              Your Dashboard
            </Nav.Link>
          </Nav.Item>
        </Dropdown.Item>

        <Dropdown.Item>
          <h6 
            className="mx-2"
            onClick={navigateToProfile}
            style={{cursor: "pointer"}}
          >
            Your Profile
          </h6>
        </Dropdown.Item>

        <Dropdown.Item>
          <h6 
            className="mx-2" 
            style={{cursor: "pointer"}}
          >
            Your Notifications
          </h6>
        </Dropdown.Item>

        <Dropdown.Item>
          <h6 
            className="mx-2" 
            style={{cursor: "pointer"}}
          >
            Account Settings
          </h6>
        </Dropdown.Item>
       
        <Dropdown.Item>
          <h6
            className="mx-2"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </h6>
        </Dropdown.Item>

        
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SplitDropdown;
