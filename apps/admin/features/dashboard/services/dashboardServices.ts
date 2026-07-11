import axiosInstance from "@/lib/axiosInstance";

export async function getDashboardStats() {
  const { data } = await axiosInstance.get("/dashboard/adminDashboardStats");

  return data.data;
}
