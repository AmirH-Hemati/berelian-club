import { axiosInstance } from "@repo/auth";

export async function getPermissions() {
  const { data } = await axiosInstance.get("/permissions");
  return data.data;
}

export async function getDefaultPermissions(role: string) {
  const response = await axiosInstance.get(`/permissions/defaults/${role}`);

  return response.data.data.permissions as string[];
}
