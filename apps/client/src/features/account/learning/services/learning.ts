import { axiosInstance } from "@repo/auth";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";

export async function getMyFiles(query: GetRequestsParams) {
  const params = buildQueryParams(query);
  const { data } = await axiosInstance.get(`/userFiles/myFiles?${params}`);

  return data;
}
