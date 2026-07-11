import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { approveAppointment as approveAppointmentApi } from "../services/appointmentServices";

export const useApproveAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: approveAppointment, isPending } = useMutation({
    mutationFn: approveAppointmentApi,
    onSuccess: () => {
      toast.success("جلسه مشاوره با موفقیت تایید شد");

      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { approveAppointment, isPending };
};
