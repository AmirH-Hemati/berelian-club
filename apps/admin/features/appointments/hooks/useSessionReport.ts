import { useQuery } from "@tanstack/react-query";
import { sessionReport as sessionReportApi } from "../services/appointmentServices";

export function useSessionReport(appointmentId: string) {
  const { data: sessionReport, isLoading } = useQuery({
    queryKey: ["sessionReport", appointmentId],
    queryFn: () => sessionReportApi(appointmentId),
    retry: false,
  });

  return { sessionReport, isLoading };
}
