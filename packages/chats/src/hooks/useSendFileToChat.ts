import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@repo/auth";
import { toast } from "react-toastify";

export function useSendFileToChat() {
  const queryClient = useQueryClient();

  const { mutate: sendFile, isPending: isSending } = useMutation({
    mutationFn: async ({
      conversationId,
      receiverId,
      fileId,
    }: {
      conversationId: string;
      receiverId: string;
      fileId: string;
    }) => {
      const { data } = await axiosInstance.post(
        `/messages/${conversationId}/file`,
        {
          receiverId,
          fileId,
        },
      );
      return data.data;
    },
    onSuccess: (data) => {
      toast.success("فایل با موفقیت ارسال شد");
      queryClient.invalidateQueries({
        queryKey: ["messages", data.conversation],
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در ارسال فایل");
    },
  });

  return { sendFile, isSending };
}
