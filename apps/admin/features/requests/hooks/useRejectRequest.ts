import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectRequest as rejectRequestApi } from "../services/requestServices";
import { toast } from "react-toastify";

export const useRejectRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectRequest, isPending } = useMutation({
    mutationFn: rejectRequestApi,
    onSuccess: () => {
      toast.success("درخواست با موفقیت رد شد");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { rejectRequest, isPending };
};
