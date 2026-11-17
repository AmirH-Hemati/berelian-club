"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import Login from "./Login";
import { useLoginOtp } from "./LoginOtpProvider";

export default function LoginForm() {
  const { step } = useLoginOtp();
  return (
    <DialogContent className="sm:min-w-xs">
      {step === "phone" ? (
        <DialogHeader>
          <DialogTitle className="text-200 font-mono">
            ورود به حساب کاربری
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            شماره موبایل خود را که روی آن اکانت دارید را وارد کنید
          </DialogDescription>
        </DialogHeader>
      ) : (
        <DialogHeader>
          <DialogTitle className="text-200 font-mono">
            کد تایید خود را وارد کنید
          </DialogTitle>
          <DialogDescription className="text-200">
            کد تاییدی که به شماره موبایل شما ارسال کردیم را وارد کنید
          </DialogDescription>
        </DialogHeader>
      )}

      <Login forwardLink="/account" />
    </DialogContent>
  );
}
