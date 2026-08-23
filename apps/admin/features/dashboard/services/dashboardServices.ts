import { axiosInstance } from "@repo/auth";

export async function getDashboardStats() {
  const { data } = await axiosInstance.get("/dashboard/adminDashboardStats");

  return data.data;
}
