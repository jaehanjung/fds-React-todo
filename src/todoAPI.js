import axios from "axios";

const todoAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

todoAPI.interceptors.request.use(config => {
  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});

export default todoAPI;
