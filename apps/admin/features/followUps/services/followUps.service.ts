import { axiosInstance } from "@repo/api";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";

export const getFollowUps = async (query: GetRequestsParams) => {
  const searchFields = ["note"];
  const params = buildQueryParams({
    ...query,
    searchFields: searchFields.join(","),
  });
  const { data } = await axiosInstance.get(`/followUps?${params}`);
  return data;
};
export const getTodayFollowUps = async () => {
  const { data } = await axiosInstance.get("/followUps/today");
  return data.data;
};
export const completeFollowUps = async (id: string) => {
  const { data } = await axiosInstance.patch(`/followUps/${id}/complete`);
  return data.data;
};
export const deleteFollowUp = async (id: string) => {
  const { data } = await axiosInstance.delete(`/followUps/${id}`);
  return data.data;
};
