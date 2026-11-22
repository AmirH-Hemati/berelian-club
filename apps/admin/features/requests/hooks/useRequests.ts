"use client";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/requestServices";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
type ApiError = {
  message: string;
};
export function useRequests() {
  const searchParams = useSearchParams();
  const tableQuery = useTableQuery();

  const query = {
    ...tableQuery,
    status: searchParams.get("status") ?? "",
    type: searchParams.get("type") ?? "",
    assignedTo: searchParams.get("assignedTo") ?? "",
    investor: searchParams.get("investor") ?? "",
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
    queryKey: ["requests", query],
    queryFn: () => getRequests(query),
  });
  return {
    requests: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
    error: error as AxiosError<ApiError> | null,
  };
}
