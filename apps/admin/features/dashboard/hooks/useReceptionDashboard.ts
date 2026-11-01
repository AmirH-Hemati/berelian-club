import { useQuery } from "@tanstack/react-query";
import { getReceptionDashboard } from "../services/dashboardServices";

export function useReceptionDashboard() {
  const {
    data: receptions = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["receptionDashboard"],
    queryFn: getReceptionDashboard,
  });
  console.log(receptions);
  return {
    receptions,
    isLoading,
    error,
    isError,
    refetch,
  };
}
