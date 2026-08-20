import { axiosInstance } from "@repo/api";

export const getMyNotifications = async () => {
  const { data } = await axiosInstance.get("/notifications");
  return data.data;
};

export async function markAllNotificationsAsRead() {
  const { data } = await axiosInstance.patch("/notifications/read-all");

  return data;
}
export async function markNotificationAsRead(id: string) {
  const { data } = await axiosInstance.patch(`/notifications/${id}/read`);

  return data;
}
