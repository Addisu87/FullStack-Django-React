import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
  getAccessToken,
  getRefreshToken,
  getUser,
} from "../hooks/user.actions";

const axiosService = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use(async (config) => {
  /**
   * Retrieving the access token from the local storage
   * and adding it to the headers of the request
   */
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
});

axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

// a function that contains the refresh auth logic
// This function will be called whenever the failed request returns a 401 error
const refreshAuthLogic = async (failedRequest) => {
  return axios
    .post(
      "/auth/refresh/",
      {
        refresh: getRefreshToken(),
      },
      {
        baseURL: "http://localhost:8000/api",
      }
    )
    .then((resp) => {
      const { access } = resp.data;
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + access;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          access,
          refresh: getRefreshToken(),
          user: getUser(),
        })
      );
    })
    .catch(() => {
      localStorage.removeItem("auth");
    });
};

// initialize the authentication interceptor and create a custom fetcher
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);
export const fetcher = async (url) => {
  return await axiosService.get(url).then((res) => res.data);
};

export default axiosService;
