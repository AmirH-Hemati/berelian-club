"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type LoginStep = "phone" | "otp";

type LoginOtpContextType = {
  step: LoginStep;
  setStep: Dispatch<SetStateAction<LoginStep>>;

  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;

  otpExpiresAt: string | null;
  setOtpExpiresAt: Dispatch<SetStateAction<string | null>>;
};

const LoginOtpContext = createContext<LoginOtpContextType | null>(null);

export function LoginOtpProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<LoginStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpExpiresAt, setOtpExpiresAt] = useState<string | null>(null);

  return (
    <LoginOtpContext.Provider
      value={{
        step,
        setStep,
        phoneNumber,
        setPhoneNumber,
        otpExpiresAt,
        setOtpExpiresAt,
      }}
    >
      {children}
    </LoginOtpContext.Provider>
  );
}

export function useLoginOtp() {
  const context = useContext(LoginOtpContext);

  if (!context) {
    throw new Error("useLoginOtp must be used within LoginOtpProvider");
  }

  return context;
}
