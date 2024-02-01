// auth.js

const TOKEN_KEY = 'authToken';
const USERNAME_KEY = 'username'; // New key for storing the username in localStorage
const USERID_KEY = 'userId';
const USERROLE_KEY = 'userRole'

const isAuthenticated = () => {
  const authToken = localStorage.getItem(TOKEN_KEY);
  return !!authToken;
};

const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });

    const result = await response.json();

    if (response.ok && result.success) {
      localStorage.setItem(TOKEN_KEY, result.authToken);
      localStorage.setItem(USERID_KEY, result.id);
      localStorage.setItem(USERROLE_KEY, result.role);
      localStorage.setItem(USERNAME_KEY, result.username); // Store username in localStorage
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
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY); // Remove username from localStorage
};

export { isAuthenticated, login, logout };
