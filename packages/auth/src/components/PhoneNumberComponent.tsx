"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, phoneSchemaTypes } from "@repo/schema";
import { Button, FormField } from "@repo/ui";
import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "../hooks/useSendOtp";
import { useLoginOtp } from "./LoginOtpProvider";

export default function PhoneNumberComponent() {
  const { sendCode, isSendingCode } = useSendOtp();

  const { setStep, setPhoneNumber, setOtpExpiresAt } = useLoginOtp();

  const form = useForm<phoneSchemaTypes>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  function handleSubmit(values: phoneSchemaTypes) {
    sendCode(values.phoneNumber, {
      onSuccess: (response) => {
        setPhoneNumber(values.phoneNumber);
        setOtpExpiresAt(response.data.expiresAt);
        setStep("otp");
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FormField
        control={form.control}
        name="phoneNumber"
        icon={Phone}
        label="شماره تلفن همراه"
        placeholder="09123456789"
        type="tel"
      />

      <div className="-mx-4 -mb-4 mt-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end">
        <Button type="submit" className="w-full" disabled={isSendingCode}>
          دریافت کد تایید
        </Button>
      </div>
    </form>
  );
}
