import axios from "axios";

const instance = axios.create({
  baseURL: "http://172.20.10.3:5000/api",
});
// 

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

