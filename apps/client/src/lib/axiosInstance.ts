import { useAuthStore } from "@/components/providers/authStore";
import { createAxios } from "@repo/api";

// const axiosInstance = axios.create({
//   baseURL: "https://monorepo-bashgah-moshtarian.onrender.com/api/v1",
//   // baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

const axiosInstance = createAxios();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
