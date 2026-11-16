import { axiosInstance } from "@repo/auth";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";

export async function getRequests(query: GetRequestsParams) {
  const params = buildQueryParams({
    ...query,
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
export const completeRequest = async (requestId: string) => {
  const { data } = await axiosInstance.patch(`/requests/${requestId}/complete`);
  return data.data;
};
export const rejectRequest = async (
  requestId: string,
  rejectionReason: string,
) => {
  const { data } = await axiosInstance.patch(`/requests/${requestId}/reject`, {
    reason: rejectionReason,
  });
  return data.data;
};

export const deleteRequest = async (requestId: string) => {
  const { data } = await axiosInstance.delete(`/requests/${requestId}`);
  return data.data;
};
