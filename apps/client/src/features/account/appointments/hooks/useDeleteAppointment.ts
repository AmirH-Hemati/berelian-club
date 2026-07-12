"use client";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment as deleteAppointmentApi } from "../services/appointmentsService";

export function useDeleteAppointment() {
  const qeuryClient = useQueryClient();
  const { mutate: deleteAppointment, isPending: isDeleting } = useMutation({
    mutationFn: deleteAppointmentApi,
    onSuccess: () => {
      toast.success("درخواست مشاوره شما با موفقیت حذف شد");
      qeuryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteAppointment, isDeleting };
}
