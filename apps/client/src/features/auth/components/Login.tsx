"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { useState, useEffect, useRef } from "react";
import { InputOTPForm } from "./InputOtpForm";
import PhoneNumberComponent from "./PhoneNumberComponent";

export type Step = "phone" | "otp";

export default function Login() {
  const [step, setStep] = useState<Step>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSentAt, setOtpSentAt] = useState<Date | null>(null);
  const [timer, setTimer] = useState(120);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getRemainingSeconds = () => {
    if (!otpSentAt) return 120;
    const elapsed = (Date.now() - otpSentAt.getTime()) / 1000;
    return Math.max(0, 120 - Math.floor(elapsed));
  };

  useEffect(() => {
    if (step !== "otp") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const updateTimer = () => {
      const remaining = getRemainingSeconds();
      setTimer(remaining);

      if (remaining <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    updateTimer();

    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [step, otpSentAt]);

  function handleChangeStep(step: Step) {
    setStep(step);
  }

  function handleSetPhoneNumber(phone: string) {
    setPhoneNumber(phone);
    const now = new Date();
    setOtpSentAt(now);
    setTimer(120);
  }

  function handleResetTimer() {
    const now = new Date();
    setOtpSentAt(now);
    setTimer(120);
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
          timer={timer}
          onResetTimer={handleResetTimer}
        />
      )}
    </DialogContent>
  );
}
