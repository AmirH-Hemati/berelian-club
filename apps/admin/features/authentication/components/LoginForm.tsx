"use client";

import { useState } from "react";
import PhoneNumberComponent from "./PhoneNumberComponent";
import { InputOTPForm } from "./InputOtpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type Step = "phone" | "otp";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<Step>("phone");
  function handleChangeStep(step: Step) {
    setStep(step);
  }

  function handleSetPhoneNumber(phone: string) {
    setPhoneNumber(phone);
  }
  return (
    <Card className="min-w-xs ">
      {step === "phone" ? (
        <CardHeader>
          <CardTitle className="text-300 font-mono">
            ورود به حساب کاربری
          </CardTitle>
          <CardDescription className="text-200 text-muted-foreground">
            شماره موبایل خود را که روی آن اکانت دارید را وارد کنید
          </CardDescription>
        </CardHeader>
      ) : (
        <CardHeader>
          <CardTitle className="text-300 font-mono">
            کد تایید خود را وارد کنید
          </CardTitle>
          <CardDescription className="text-200 text-muted-foreground">
            کد تاییدی که به شماره موبایل شما ارسال کردیم را وارد کنید
          </CardDescription>
        </CardHeader>
      )}

      <CardContent>
        {step === "phone" && (
          <PhoneNumberComponent
            onChangeStep={handleChangeStep}
            onSetPhoneNumber={handleSetPhoneNumber}
          />
        )}
      </CardContent>

      <CardContent>
        {step === "otp" && (
          <InputOTPForm
            phoneNumber={phoneNumber}
            onChangeStep={handleChangeStep}
          />
        )}
      </CardContent>
    </Card>
  );
}
