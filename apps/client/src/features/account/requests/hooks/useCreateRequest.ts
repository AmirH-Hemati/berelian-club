import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest as createRequestApi } from "../services/requestsService";
import { toast } from "sonner";
export function useCreateRequest() {
  const queryClient = useQueryClient();
  const { mutate: createRequest, isPending: isCreating } = useMutation({
    mutationFn: createRequestApi,
    onSuccess: () => {
      toast.success("درخواست شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { createRequest, isCreating };
}
