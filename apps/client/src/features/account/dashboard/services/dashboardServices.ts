import { axiosInstance } from "@repo/auth";

export async function getDashboardStats() {
  const { data } = await axiosInstance.get("/dashboard/investor");

  return data.data;
}
