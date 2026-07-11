"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/usersServices";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useGetUsers() {
  const qeury = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", qeury.page, qeury.limit, qeury.search],
    queryFn: () => getAllUsers(qeury),
  });

  return {
    users: data.data ?? [],
    pagination: data.pagination ?? null,
    isLoading,
    isError,
    refetch,
  };
}
