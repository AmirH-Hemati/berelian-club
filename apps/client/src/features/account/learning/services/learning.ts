import axiosInstance from "@/lib/axiosInstance";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";

export async function getMyFiles(query: GetRequestsParams) {
  const params = buildQueryParams(query);
  const { data } = await axiosInstance.get(`/userFiles/myFiles?${params}`);

  return data;
}
