"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentMyRequests } from "../services/requestsService";

export function useRecentRequests() {
  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myRequests"],
    queryFn: getRecentMyRequests,
  });

  return { requests, isLoading, error };
}
