import { axiosInstance } from "@repo/api";

export async function getDashboardStats() {
  const { data } = await axiosInstance.get("/dashboard/adminDashboardStats");

  return data.data;
}
