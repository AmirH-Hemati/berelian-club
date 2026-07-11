import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveRequest as approveRequestApi } from "../services/requestServices";
import { toast } from "react-toastify";

export const useApproveRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: approveRequest, isPending } = useMutation({
    mutationFn: approveRequestApi,
    onSuccess: () => {
      toast.success("درخواست با موفقیت تایید شد");

      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { approveRequest, isPending };
};
