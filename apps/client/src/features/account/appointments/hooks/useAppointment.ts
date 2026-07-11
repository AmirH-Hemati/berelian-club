import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getAppointment } from "../services/appointmentsService";

export function useAppointment() {
  const { appointmentId } = useParams();
  const { data: appointment, isLoading } = useQuery({
    queryFn: () => getAppointment(appointmentId as string),
    queryKey: ["appointments", appointmentId],
  });

  return { appointment, isLoading };
}
