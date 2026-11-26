import { axiosInstance } from "@repo/auth";

export async function getPermissions() {
  const { data } = await axiosInstance.get("/permissions");
  return data.data;
}
