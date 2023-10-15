import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import authSlice from "../redux//authSlice";
import store from "../redux/store.js";
import { logoutUser } from "../redux/authSlice";

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use(async (config) => {
  const { accessToken } = store.getState().auth;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // Trigger logout action if the request returns 401 unauthorized
      store.dispatch(logoutUser());
    }
    return Promise.reject(err);
  }
);

// A function that contains the refresh auth logic
// This function will be called whenever the failed request returns a 401 error
const refreshAuthLogic = async (failedRequest) => {
  const { refreshToken } = store.getState().auth;
  try {
    const response = await axios.post(
      "/auth/refresh/",
      {
        refresh: refreshToken,
      },
      {
        baseURL: process.env.REACT_APP_API_URL,
      }
    );

    const { access, refresh } = response.data;
    failedRequest.response.config.headers["Authorization"] = "Bearer " + access;

    // Dispatch the setAuthTokens action to update the authentication tokens
    store.dispatch(
      authSlice.actions.setAuthTokens({
        accessToken: access,
        refreshToken: refresh,
      })
    );

    // Retry the original request with the new access token
    return Promise.resolve();
  } catch (error) {
    // Handle refresh token request error, e.g., logout the user
    store.dispatch(logoutUser());
    return Promise.reject(error);
  }
};

// initialize the authentication interceptor and create a custom fetcher
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);
export const fetcher = async (url) => {
  return await axiosService.get(url).then((res) => res.data);
};

export default axiosService;
