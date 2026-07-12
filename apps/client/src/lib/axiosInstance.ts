import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://monorepo-bashgah-moshtarian.onrender.com/api/v1",
  withCredentials: true,
});

export default axiosInstance;
