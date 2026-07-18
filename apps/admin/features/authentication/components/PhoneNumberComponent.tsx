"use client";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, phoneSchemaTypes } from "@repo/schema";
import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "../hooks/useSendOtp";
import { Step } from "./LoginForm";

type Props = {
  onChangeStep: (step: Step) => void;
  onSetPhoneNumber: (phone: string) => void;
};
export default function PhoneNumberComponent({
  onChangeStep,
  onSetPhoneNumber,
}: Props) {
  const { sendCode, isSendingCode } = useSendOtp();
  const form = useForm<phoneSchemaTypes>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "09913199902",
    },
  });

  function handleSubmit(values: phoneSchemaTypes) {
    sendCode(values.phoneNumber);
    onSetPhoneNumber(values.phoneNumber);
    onChangeStep("otp");
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-2">
      <FormField
        control={form.control}
        name="phoneNumber"
        label="شماره تلفن همراه"
        type="tel"
        icon={Phone}
        placeholder="09123456789"
      />

      <CardFooter className="mt-4">
        <Button type="submit" className="w-full" disabled={isSendingCode}>
          دریافت کد تایید
        </Button>
      </CardFooter>
    </form>
  );
}
