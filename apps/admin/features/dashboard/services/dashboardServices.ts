import { axiosInstance } from "@repo/auth";

export async function getAdminDashboard() {
  const { data } = await axiosInstance.get("/dashboard/admin");

  return data.data;
}

export async function getReceptionDashboard() {
  const { data } = await axiosInstance.get("/dashboard/reception");
  return data.data;
}
export async function getConsultantDashboard() {
  const { data } = await axiosInstance.get("/dashboard/consultant");
  return data.data;
}
