"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { useState } from "react";
import { InputOTPForm } from "./InputOtpForm";
import PhoneNumberComponent from "./PhoneNumberComponent";

export type Step = "phone" | "otp";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<Step>("phone");
  function handleChangeStep(step: Step) {
    setStep(step);
  }

  function handleSetPhoneNumber(phone: string) {
    setPhoneNumber(phone);
  }
  return (
    <DialogContent>
      {step === "phone" ? (
        <DialogHeader>
          <DialogTitle className="text-xs md:text-sm font-mono">
            ورود به حساب کاربری
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            شماره موبایل خود را که روی آن اکانت دارید را وارد کنید
          </DialogDescription>
        </DialogHeader>
      ) : (
        <DialogHeader>
          <DialogTitle className="text-xs md:text-sm font-mono">
            کد تایید خود را وارد کنید
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            کد تاییدی که به شماره موبایل شما ارسال کردیم را وارد کنید
          </DialogDescription>
        </DialogHeader>
      )}
      {step === "phone" && (
        <PhoneNumberComponent
          onChangeStep={handleChangeStep}
          onSetPhoneNumber={handleSetPhoneNumber}
        />
      )}

      {step === "otp" && (
        <InputOTPForm
          phoneNumber={phoneNumber}
          onChangeStep={handleChangeStep}
        />
      )}
    </DialogContent>
  );
}
