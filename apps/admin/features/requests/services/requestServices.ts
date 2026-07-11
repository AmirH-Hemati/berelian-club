import axiosInstance from "@/lib/axiosInstance";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";

export async function getRequests(qeury: GetRequestsParams) {
  const searchFields = ["user.firstName", "user.lastName"];
  const params = buildQueryParams({
    ...qeury,
    searchFields: searchFields.join(",").trim(),
  });
  const { data } = await axiosInstance.get(`/requests?${params}`);

  return data;
}

export async function getRecentRequests() {
  const { data } = await axiosInstance.get("/requests");
  return data;
}

export async function getRequest(requestId: string) {
  const { data } = await axiosInstance.get(`/requests/${requestId}`);

  return data.data;
}
export async function getUserRequests(userId: string) {
  const { data } = await axiosInstance.get(`/requests/userRequests/${userId}`);

  return data.data;
}

export const approveRequest = async (requestId: string) => {
  const { data } = await axiosInstance.patch(`/requests/${requestId}/approve`);
  return data.data;
};
export const rejectRequest = async (requestId: string) => {
  const { data } = await axiosInstance.patch(`/requests/${requestId}/reject`);
  return data.data;
};

export const deleteRequest = async (requestId: string) => {
  const { data } = await axiosInstance.delete(`/requests/${requestId}`);
  return data.data;
};
