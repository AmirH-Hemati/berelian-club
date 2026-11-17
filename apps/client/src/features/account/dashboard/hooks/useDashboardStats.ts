import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/dashboardServices";

export function useDashboardStats() {
  const {
    data: stats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["investorDashboardStats"],
    queryFn: getDashboardStats,
  });
  return {
    stats,
    isLoading,
    error,
  };
}


