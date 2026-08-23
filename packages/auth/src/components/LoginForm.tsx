"use client";

import { useState } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import Login from "./Login";
export type Step = "phone" | "otp";
export default function LoginForm() {
  const [step, setStep] = useState<Step>("phone");

  return (
    <DialogContent className="w-xs">
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

      <Login step={step} setStep={setStep} forwardLink="/account" />
    </DialogContent>
  );
}
