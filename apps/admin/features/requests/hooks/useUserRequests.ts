"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserRequests } from "../services/requestServices";

export function useUserRequests(userId: string) {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userRequests", userId],
    queryFn: () => getUserRequests(userId as string),
  });

  return { requests: data ?? [], isLoading, isError, refetch };
}
