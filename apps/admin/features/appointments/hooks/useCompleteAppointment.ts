import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { completeAppointment as completeAppointmentApi } from "../services/appointmentServices";

export const useCompleteAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: completeAppointment, isPending } = useMutation({
    mutationFn: completeAppointmentApi,
    onSuccess: () => {
      toast.success("جلسه مشاوره با موفقیت برگزار شد");

      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { completeAppointment, isPending };
};
