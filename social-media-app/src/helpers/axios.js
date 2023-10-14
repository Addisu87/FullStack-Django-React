import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
  getAccessToken,
  getRefreshToken,
  getUser,
} from "../hooks/user.actions";

const axiosService = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

// a function that contains the refresh auth logic
// This function will be called whenever the failed request returns a 401 error
const refreshAuthLogic = async (failedRequest) => {
  try {
    const response = await axios.post(
      "/auth/refresh/",
      {
        refresh: getRefreshToken(),
      },
      {
        baseURL: "http://localhost:8000/api",
      }
    );

    const { access } = response.data;
    failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
    localStorage.setItem(
      "auth",
      JSON.stringify({
        access,
        refresh: getRefreshToken(),
        user: getUser(),
      })
    );

    return Promise.resolve();
  } catch (error) {
    localStorage.removeItem("auth");
    return Promise.reject(error);
  }
};

// initialize the authentication interceptor and create a custom fetcher
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);
export const fetcher = async (url) => {
  return await axiosService.get(url).then((res) => res.data);
};

export default axiosService;
