import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../services/authServices";
import { toast } from "react-toastify";

export function useSendOtp() {
  const { mutate: sendCode, isPending: isSendingCode } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      console.log(data);
      toast.success(`${data.message} ${data.data.code}`);
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { sendCode, isSendingCode };
}
