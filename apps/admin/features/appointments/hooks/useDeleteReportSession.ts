import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSessionReport as deleteSessionReportApi } from "../services/appointmentServices";

export function useDeleteReportSession(appointmentId: string) {
  const queryClient = useQueryClient();
  const { mutate: deleteSessionReport, isPending: isDeleting } = useMutation({
    mutationFn: deleteSessionReportApi,
    onSuccess: () => {
      toast.success("گزارش  شما با موفقیت حذف شد");
      queryClient.removeQueries({ queryKey: ["sessionReport", appointmentId] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteSessionReport, isDeleting };
}
