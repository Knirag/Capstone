import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.20.10.3:5000/api",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
