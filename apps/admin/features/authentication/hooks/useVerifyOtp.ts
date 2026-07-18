import { useMutation } from "@tanstack/react-query";
import { verifyOtp as verifyOtpApi } from "../services/authServices";
import { verifyOtpTypes } from "@repo/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useVerifyOtp() {
  const router = useRouter();
  const { mutate: verifyOtp, isPending: isVerifingCode } = useMutation({
    mutationFn: ({ phoneNumber, otp }: verifyOtpTypes) =>
      verifyOtpApi({ phoneNumber, otp }),
    onSuccess: (data) => {
      if (data?.user?.role !== "investor") {
        router.push("/login");
        toast.success("دسترسی شما غیر مجاز است");
      } else {
        toast.success("خوش امدید ...");
        router.push("/");
      }
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { verifyOtp, isVerifingCode };
}
