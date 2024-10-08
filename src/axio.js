import axios from "axios";

const http = axios.create({
  baseURL: "https://fn27.vimlc.uz/",
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
