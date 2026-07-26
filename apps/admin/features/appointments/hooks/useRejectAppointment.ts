import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { rejectAppointment as rejectAppointmentApi } from "../services/appointmentServices";

interface RejectAppointmentParams {
  appointmentId: string;
  rejectionReason: string;
}

export const useRejectAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectAppointment, isPending } = useMutation({
    mutationFn: ({ appointmentId, rejectionReason }: RejectAppointmentParams) =>
      rejectAppointmentApi(appointmentId, rejectionReason),
    onSuccess: () => {
      toast.success("جلسه مشاوره با موفقیت رد شد");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در رد درخواست");
    },
  });

  return { rejectAppointment, isPending };
};
