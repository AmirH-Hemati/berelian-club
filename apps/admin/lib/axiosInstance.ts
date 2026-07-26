import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://monorepo-bashgah-moshtarian.onrender.com/api/v1",
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
