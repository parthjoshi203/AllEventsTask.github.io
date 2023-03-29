import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5174",
  // timeoutErrorMessage: "Something went wrong. Try after sometime.",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("token");
    if (token) {
      const jsonToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${jsonToken.accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.data) {
      return Promise.reject(new Error(error.response.data));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
