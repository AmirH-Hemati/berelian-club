import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest as deleteRequestApi } from "../services/requestsService";
import { toast } from "react-toastify";
export function useDeleteRequest() {
  const qeuryClient = useQueryClient();
  const { mutate: deleteRequest, isPending: isDeleting } = useMutation({
    mutationFn: deleteRequestApi,
    onSuccess: () => {
      toast.success("درخواست شما با موفقیت حذف شد");
      qeuryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteRequest, isDeleting };
}
