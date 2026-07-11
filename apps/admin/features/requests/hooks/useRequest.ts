"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getRequest } from "../services/requestServices";

export function useRequest() {
  const { requestId } = useParams();
  const {
    data: request,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["requests", requestId],
    queryFn: () => getRequest(requestId as string),
  });

  return { request, isLoading, isError, refetch };
}
