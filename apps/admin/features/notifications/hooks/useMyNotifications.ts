"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../services/notificationsService";
import { useTableQuery } from "@/hooks/useTableQuery";

export function useMyNotifications() {
  const query = useTableQuery();

  const {
    data = {},
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: [
      "notifications",
      query.page,
      query.limit,
      query.search,
      query.status,
    ],
    queryFn: () => getMyNotifications(query),
  });

  return {
    notifications: data?.data?.notifications ?? [],
    pagination: data?.pagination ?? null,
    isLoading,
    isError,
    refetch,
    error,
  };
}
