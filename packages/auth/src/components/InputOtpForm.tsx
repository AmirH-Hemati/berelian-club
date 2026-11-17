"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Button,
  Field,
  FieldError,
  FieldLabel,
} from "@repo/ui";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, otpSchemaTypes } from "@repo/schema";

import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useOtpTimer } from "../hooks/useOtpTimer";
import { TimerButton } from "./TimerButton";
import { useLoginOtp } from "./LoginOtpProvider";

type Props = {
  forwardLink: string;
};

export default function InputOTPForm({ forwardLink }: Props) {
  const { phoneNumber, setStep } = useLoginOtp();

  const { verifyOtp, isVerifingCode } = useVerifyOtp(forwardLink);

  const { isExpired } = useOtpTimer();

  const form = useForm<otpSchemaTypes>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  function handleSubmit(values: otpSchemaTypes) {
    verifyOtp({ ...values, phoneNumber });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-1" data-invalid={fieldState.invalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">کد تایید</FieldLabel>

              <TimerButton />
            </div>

            <div className="flex justify-center">
              <InputOTP
                disabled={isVerifingCode || isExpired}
                aria-invalid={fieldState.invalid}
                dir="rtl"
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                <InputOTPGroup className="md:*:data-[slot=input-otp-slot]:h-12 md:*:data-[slot=input-otp-slot]:w-11 md:*:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={5} aria-invalid={fieldState.invalid} />
                  <InputOTPSlot index={4} aria-invalid={fieldState.invalid} />
                  <InputOTPSlot index={3} aria-invalid={fieldState.invalid} />
                </InputOTPGroup>

                <InputOTPSeparator className="mx-1 md:mx-2" />

                <InputOTPGroup className="md:*:data-[slot=input-otp-slot]:h-12 md:*:data-[slot=input-otp-slot]:w-11 md:*:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={2} aria-invalid={fieldState.invalid} />
                  <InputOTPSlot index={1} aria-invalid={fieldState.invalid} />
                  <InputOTPSlot index={0} aria-invalid={fieldState.invalid} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="-mx-4 -mb-4 mt-4 flex flex-col gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:justify-end">
        <Button
          type="submit"
          className="w-full"
          disabled={isVerifingCode || isExpired}
        >
          تایید و ورود
        </Button>

        <div className="flex flex-wrap gap-2 text-muted-foreground text-100">
          <p>شماره همراه خود را اشتباه وارد کرده‌اید؟</p>

          <span
            className="cursor-pointer text-primary underline"
            onClick={() => setStep("phone")}
          >
            تغییر شماره همراه
          </span>
        </div>
      </div>
    </form>
  );
}
