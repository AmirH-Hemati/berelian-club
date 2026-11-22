"use client";
import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../services/uploadServices";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
type ApiError = {
  message: string;
};
export function useFiles() {
  const searchParams = useSearchParams();
  const tableQuery = useTableQuery();

  const query = {
    ...tableQuery,
    fileType: searchParams.get("fileType") ?? "",
    mimeType: searchParams.get("mimeType") ?? "",
    "createdAt[gte]": searchParams.get("createdAt[gte]") ?? "",
    "createdAt[lt]": searchParams.get("createdAt[lt]") ?? "",
  };

  const {
    data = {},
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["files", query],
    queryFn: () => getFiles(query),
  });
  return {
    files: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
    error: error as AxiosError<ApiError> | null,
  };
}
