import { axiosInstance } from "@repo/auth";

export const getMyNotifications = async () => {
  const { data } = await axiosInstance.get("/notifications");
  return data.data;
};
export async function getUnreadNotificationsCount(): Promise<number> {
  const { data } = await axiosInstance.get("/notifications/unread-count");

  return data.data.count;
}

export async function markAllNotificationsAsRead() {
  const { data } = await axiosInstance.patch("/notifications/read-all");

  return data;
}
export async function markNotificationAsRead(id: string) {
  const { data } = await axiosInstance.patch(`/notifications/${id}/read`);

  return data;
}
