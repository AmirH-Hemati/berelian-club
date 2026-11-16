"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getFollowup } from "../services/followUps.service";

export function useFollowup() {
  const { followUp } = useParams<{ followUp: string }>();

  const {
    data: followupData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getFollowup(followUp),
    queryKey: ["followUp", followUp],
    enabled: !!followUp,
  });

  return {
    followup: followupData,
    isLoading,
    isError,
    refetch,
  };
}
