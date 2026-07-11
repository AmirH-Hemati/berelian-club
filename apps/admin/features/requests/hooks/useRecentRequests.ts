"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentRequests, getRequests } from "../services/requestServices";

export function useRecentRequests() {
  const {
    data: requests,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["recentRequests"],
    queryFn: getRecentRequests,
  });

  return { requests: requests?.data ?? [], isLoading, isError, refetch };
}
