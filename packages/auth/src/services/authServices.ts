import { axiosInstance } from "@repo/auth";
import { updateMeTypes, verifyOtpTypes } from "@repo/schema";

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

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");

  return data.data;
};

export const updateMe = async (updateUser: updateMeTypes) => {
  const { data } = await axiosInstance.patch("/auth/updateMe", updateUser, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};
