import { useQuery } from "@tanstack/react-query";
import { getTodayFollowUps } from "../services/followUps.service";

export function useTodayFollowUps() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["todayFollowUps"],

    queryFn: getTodayFollowUps,
  });

  return { followUps: data ?? [], isLoading, isError, refetch };
}
