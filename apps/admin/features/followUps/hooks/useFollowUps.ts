import { useQuery } from "@tanstack/react-query";
import { getFollowUps } from "../services/followUps.service";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useSearchParams } from "next/navigation";

export function useFollowUps() {
  const searchParams = useSearchParams();
  const tableQuery = useTableQuery();

  const query = {
    ...tableQuery,
    status: searchParams.get("status") ?? "",
    consultant: searchParams.get("consultant") ?? "",
    "dueDate[gte]": searchParams.get("dueDate[gte]") ?? "",
    "dueDate[lt]": searchParams.get("dueDate[lt]") ?? "",
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
    queryKey: ["followUps", query],

    queryFn: () => getFollowUps(query),
  });

  return {
    followUps: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
    error,
  };
}
