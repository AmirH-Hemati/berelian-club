import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendFile as sendFileApi } from "../services/uploadServices";

export const useSendFileToUser = () => {
  const queryClient = useQueryClient();

  const { isPending: isSending, mutate: sendFile } = useMutation({
    mutationFn: ({ fileId, userId }: { fileId: string; userId: string }) =>
      sendFileApi({ userId, fileId }),
    onSuccess: () => {
      toast.success(`فایل با موفقیت ارسال شد`);
      queryClient.invalidateQueries({ queryKey: ["userFiles"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در ارسال فایل");
    },
  });

  return { sendFile, isSending };
};
