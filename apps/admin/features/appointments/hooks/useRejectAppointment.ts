import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { rejectAppointment as rejectAppointmentApi } from "../services/appointmentServices";

export const useRejectAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectAppointment, isPending } = useMutation({
    mutationFn: rejectAppointmentApi,
    onSuccess: () => {
      toast.success("جلسه مشاوره با موفقیت کنسل شد");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { rejectAppointment, isPending };
};
