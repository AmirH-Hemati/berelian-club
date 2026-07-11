"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getRequest } from "../services/requestsService";

export function useRequest() {
  const { requestId } = useParams();
  const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requests", requestId],
    queryFn: () => getRequest(requestId as string),
  });

  return { request, isLoading, error };
}
