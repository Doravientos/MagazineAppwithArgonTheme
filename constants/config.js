import axios from "axios";

const API_BASE = "https://tnreaders.in/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

export default axiosInstance;
