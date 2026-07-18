import axiosInstance from "@/lib/axiosInstance";
import { verifyOtpTypes } from "@repo/schema";

export const sendOtp = async (phoneNumber: string) => {
  const { data } = await axiosInstance.post("/auth/sendOtp", { phoneNumber });
  console.log(data);
  return data;
};

export const verifyOtp = async ({ phoneNumber, otp }: verifyOtpTypes) => {
  const { data } = await axiosInstance.post("/auth/verifyOtp", {
    phoneNumber,
    otp,
  });

  return data.data;
};
export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};
export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");

  return data.data;
};
