import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSessionReport as createSessionReportApi } from "../services/appointmentServices";
import { toast } from "react-toastify";

export const useCreateSessionReport = () => {
  const queryClient = useQueryClient();

  const { mutate: createSessionReport, isPending } = useMutation({
    mutationFn: createSessionReportApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionReport"] });
      toast.success("گزارش با موفقیت ثبت شد");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { createSessionReport, isPending };
};
