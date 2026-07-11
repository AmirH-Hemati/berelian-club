import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSessionReport as deleteSessionReportApi } from "../services/appointmentServices";

export function useDeleteReportSession() {
  const qeuryClient = useQueryClient();
  const { mutate: deleteSessionReport, isPending: isDeleting } = useMutation({
    mutationFn: deleteSessionReportApi,
    onSuccess: () => {
      toast.success("گزارش  شما با موفقیت حذف شد");
      qeuryClient.invalidateQueries({ queryKey: ["sessionReport"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteSessionReport, isDeleting };
}
