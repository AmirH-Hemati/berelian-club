import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export function useCloseConversation() {
  const queryClient = useQueryClient();

  const { mutate: closeConversation, isPending: isClosing } = useMutation({
    mutationFn: async (conversationId: string) => {
      const { data } = await axiosInstance.patch(
        `/conversations/${conversationId}/close`,
      );
      return data.data;
    },
    onSuccess: () => {
      toast.success("گفتگو با موفقیت بسته شد");
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در بستن گفتگو");
    },
  });

  return { closeConversation, isClosing };
}
