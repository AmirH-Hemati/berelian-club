"use client";
import { FormField } from "@/components/FormField";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Button,
  DialogFooter,
} from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, phoneSchemaTypes } from "@repo/schema";
import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { Step } from "./Login";
import { useSendOtp } from "../hooks/useSendOtp";

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
    onSetPhoneNumber(values.phoneNumber);
    sendCode(values.phoneNumber, {
      onSuccess: () => {
        onChangeStep("otp");
      },
    });
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="py-2">
      <FormField
        control={form.control}
        name="phoneNumber"
        label="شماره تلفن همراه"
      >
        <InputGroup dir="rtl">
          <InputGroupAddon align="inline-end">
            <Phone />
          </InputGroupAddon>
          <InputGroupInput
            disabled={isSendingCode}
            placeholder="09123456789"
            type="tel"
          />
        </InputGroup>
      </FormField>
      <DialogFooter className="mt-4">
        <Button type="submit" className="w-full" disabled={isSendingCode}>
          دریافت کد تایید
        </Button>
      </DialogFooter>
    </form>
  );
}
