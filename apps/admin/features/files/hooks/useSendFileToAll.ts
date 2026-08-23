import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@repo/auth";
import { toast } from "react-toastify";

export function useSendFileToAll() {
  const queryClient = useQueryClient();

  const { mutate: sendFileToAll, isPending: isSending } = useMutation({
    mutationFn: async ({ fileId }: { fileId: string }) => {
      const { data } = await axiosInstance.post("/userFiles/send-to-all", {
        fileId,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        data.message || "فایل با موفقیت برای همه سرمایه‌گذاران ارسال شد",
      );
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در ارسال فایل");
    },
  });

  return { sendFileToAll, isSending };
}
