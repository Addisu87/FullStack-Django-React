import axios from "axios";
import { useNavigate } from "react-router-dom";

const useUserActions = () => {
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api";

  // Set the access, token and user property
  const setUserData = (data) => {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        access: data.access,
        refresh: data.refresh,
        user: data.user,
      })
    );
  };

  // Login the user
  const login = async (data) => {
    return await axios.post(`${baseURL}/auth/login/`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(data);
      navigate("/");
    });
  };

  // Register the user
  const register = async (data) => {
    return await axios.post(`${baseURL}/auth/register/`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(data);
      navigate("/");
    });
  };

  // Logout the user
  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return {
    login,
    register,
    logout,
  };
};

// Get the user
const getUser = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.user;
};

// Get the access token
const getAccessToken = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
};

// Get the refresh token
const getRefreshToken = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.refresh;
};

export { useUserActions, getUser, getAccessToken, getRefreshToken };
