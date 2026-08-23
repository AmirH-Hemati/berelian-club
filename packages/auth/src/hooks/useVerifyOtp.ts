import { useMutation } from "@tanstack/react-query";
import { verifyOtp as verifyOtpApi } from "../services/authServices";
import { verifyOtpTypes } from "@repo/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

export function useVerifyOtp(forwardLink: string) {
  const router = useRouter();
  const { mutate: verifyOtp, isPending: isVerifingCode } = useMutation({
    mutationFn: ({ phoneNumber, otp }: verifyOtpTypes) =>
      verifyOtpApi({ phoneNumber, otp }),
    onSuccess: () => {
      useAuthStore.getState().login();
      router.push(forwardLink);
      toast.success("خوش امدید ...");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { verifyOtp, isVerifingCode };
}
