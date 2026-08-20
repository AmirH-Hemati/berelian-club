import { axiosInstance } from "@repo/api";
import { buildQueryParams, GetRequestsParams } from "@/utils/buildQueryParams";

export async function uploadFile(formData: FormData) {
  const { data } = await axiosInstance.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
}

export async function getFiles(query: GetRequestsParams) {
  const searchFields = ["originalName"];
  const params = buildQueryParams({
    ...query,
    searchFields: searchFields.join(","),
  });
  const { data } = await axiosInstance.get(`/files?${params}`);

  return data;
}

export async function sendFile({
  fileId,
  userId,
}: {
  fileId: string;
  userId: string;
}) {
  const { data } = await axiosInstance.post(`/userFiles`, { fileId, userId });
  return data.data;
}

export const deleteFile = async (fileId: string) => {
  const { data } = await axiosInstance.delete(`/files/${fileId}`);
  return data.data;
};
