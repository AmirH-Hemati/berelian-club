import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Controller, useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Step } from "./Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, otpSchemaTypes } from "@repo/schema";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

type Props = { onChangeStep: (step: Step) => void; phoneNumber: string };
export function InputOTPForm({ onChangeStep, phoneNumber }: Props) {
  const { verifyOtp, isVerifingCode } = useVerifyOtp();
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
              <Button variant="outline" size="xs">
                <RefreshCwIcon />
                ارسال مجدد کد
              </Button>
            </div>
            <div className="flex justify-center">
              <InputOTP
                disabled={isVerifingCode}
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

      <DialogFooter className="mt-4">
        <div className="w-full flex flex-col gap-1">
          <Button type="submit" className="w-full" disabled={isVerifingCode}>
            تایید و ورود
          </Button>
          <div className=" flex-wrap flex gap-2 text-muted-foreground text-xs">
            شماره همراه خود را اشتباه وارد کرده اید؟{" "}
            <p
              className="text-xs text-primary underline cursor-pointer"
              onClick={() => onChangeStep("phone")}
            >
              تغییر شماره همراه
            </p>
          </div>
        </div>
      </DialogFooter>
    </form>
  );
}
