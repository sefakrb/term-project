import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
