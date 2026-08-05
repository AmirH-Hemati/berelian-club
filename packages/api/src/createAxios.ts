import axios from "axios";

export function createAxios() {
  return axios.create({
    baseURL: "https://monorepo-bashgah-moshtarian.onrender.com/api/v1",
    // baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
  });
}
