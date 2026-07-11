import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFile as uploadFileApi } from "../services/uploadServices";

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: uploadFileApi,
    onSuccess: () => {
      toast.success("فایل  با موفقیت آپلود شد");
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تایید درخواست");
    },
  });

  return { uploadFile, isUploading };
};
