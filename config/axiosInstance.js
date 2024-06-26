import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tnreders.in/api",
});

export default axiosInstance;
