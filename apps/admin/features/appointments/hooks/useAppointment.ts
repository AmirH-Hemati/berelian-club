import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "../services/appointmentServices";
import { useParams } from "next/navigation";

export function useAppointment() {
  const { appointmentId } = useParams();
  const {
    data: appointment,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getAppointment(appointmentId as string),
    queryKey: ["appointments", appointmentId],
  });

  return { appointment, isLoading, isError, refetch };
}
