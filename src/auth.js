// auth.js
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";
import API_BASE_URL from "./components/appConfig";
const TOKEN_KEY = "authToken";
const USERNAME_KEY = "username"; // New key for storing the username in localStorage
const USERID_KEY = "userId";
const USERROLE_KEY = "userRole";

const isAuthenticated = () => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const authToken = cookieData.USERID_KEY;
  return !!authToken;
};

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });

    const result = await response.json();

    if (response.ok && result.success) {
      Cookies.set(
        "knowledgeshare",
        JSON.stringify({
          TOKEN_KEY: result.authToken,
          USERNAME_KEY: result.username,
          USERID_KEY: result.id,
          USERROLE_KEY: result.role,
        })
      );

      return { success: true, username: result.username };
    } else {
      return { success: false, username: null };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, username: null };
  }
};

const logout = () => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  delete cookieData.TOKEN_KEY;
  delete cookieData.USERNAME_KEY;
  delete cookieData.USERROLE_KEY;
  delete cookieData.USERID_KEY;
  Cookies.set("knowledgeshare", JSON.stringify(cookieData));
};

export { isAuthenticated, login, logout };
