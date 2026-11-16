"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/usersServices";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useSearchParams } from "next/navigation";

export function useGetUsers() {
  const searchParams = useSearchParams();
  const tableQuery = useTableQuery();

  const query = {
    ...tableQuery,
    role: searchParams.get("role") ?? "",
    isActive: searchParams.get("isActive") ?? "",
    "contractStartDate[gte]": searchParams.get("contractStartDate[gte]") ?? "",
    "contractStartDate[lte]": searchParams.get("contractStartDate[lte]") ?? "",
    "contractEndDate[gte]": searchParams.get("contractEndDate[gte]") ?? "",
    "contractEndDate[lte]": searchParams.get("contractEndDate[lte]") ?? "",
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
    error,
  };
}
