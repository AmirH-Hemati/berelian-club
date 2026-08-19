"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import LoginForm from "./Login";
import { useState } from "react";

export type Step = "phone" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("phone");

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
        <LoginForm step={step} setStep={setStep} />
      </CardContent>
    </Card>
  );
}
