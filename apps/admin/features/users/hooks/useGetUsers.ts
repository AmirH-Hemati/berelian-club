"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/usersServices";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
type ApiError = {
  message: string;
};

export function useGetUsers() {
  const searchParams = useSearchParams();
  const tableQuery = useTableQuery();

  const query = {
    ...tableQuery,
    role: searchParams.get("role") ?? "",
    isActive: searchParams.get("isActive") ?? "",
    "contractStartDate[gte]": searchParams.get("contractStartDate[gte]") ?? "",
    "contractStartDate[lt]": searchParams.get("contractStartDate[lt]") ?? "",
    "contractEndDate[gte]": searchParams.get("contractEndDate[gte]") ?? "",
    "contractEndDate[lt]": searchParams.get("contractEndDate[lt]") ?? "",
  };

  const {
    data = {},
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["users", query],
    queryFn: () => getAllUsers(query),
  });

  return {
    users: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
    error: error as AxiosError<ApiError> | null,
  };
}
