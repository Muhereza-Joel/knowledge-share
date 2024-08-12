// auth.js
import Cookies from "js-cookie";
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

      return { success: true, username: result.username, id: result.id, role: result.role };
    } else {
      return { success: false, username: null, id: null, role: null };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, username: null };
  }
};

const REDUX_PERSIST_KEY = "persist:root";

const logout = () => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USERNAME_KEY);
  Cookies.remove(USERROLE_KEY);
  Cookies.remove(USERID_KEY);
  Cookies.set("knowledgeshare", JSON.stringify({}));
  sessionStorage.removeItem(REDUX_PERSIST_KEY);
  sessionStorage.clear();
  localStorage.clear();
};

export { isAuthenticated, login, logout };
