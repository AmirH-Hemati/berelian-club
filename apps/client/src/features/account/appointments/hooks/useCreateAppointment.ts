import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment as createAppointmentApi } from "../services/appointmentsService";
import { toast } from "react-toastify";

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { mutate: createAppointment, isPending: isCreating } = useMutation({
    mutationFn: createAppointmentApi,
    onSuccess: () => {
      toast.success("درخواست مشاوره شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { createAppointment, isCreating };
}
