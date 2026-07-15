"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentMyRequests } from "../services/requestsService";

export function useRecentRequests() {
  const {
    data: requests,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myRequests"],
    queryFn: getRecentMyRequests,
  });

  return { requests, isLoading, isError, refetch };
}
