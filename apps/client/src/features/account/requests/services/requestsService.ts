import { axiosInstance } from "@repo/api";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";
import { CreateRequestTypes } from "@repo/schema";

export const createRequest = async (newRequest: CreateRequestTypes) => {
  const { data } = await axiosInstance.post("/requests", newRequest);

  return data.data;
};
export const getRequests = async (query: GetRequestsParams) => {
  const params = buildQueryParams(query);
  const { data } = await axiosInstance.get(`/requests/myRequests?${params}`);

  return data;
};
export async function getRequest(requestId: string) {
  const { data } = await axiosInstance.get(`/requests/${requestId}`);

  return data.data;
}
export const getRecentMyRequests = async () => {
  const { data } = await axiosInstance.get(`/requests/myRequests`);

  return data.data;
};

export const deleteRequest = async (requestId: string) => {
  const { data } = await axiosInstance.delete(`/requests/${requestId}`);

  return data.data;
};
