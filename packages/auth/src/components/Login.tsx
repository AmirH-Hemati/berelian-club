"use client";

import InputOTPForm from "./InputOtpForm";
import { useLoginOtp } from "./LoginOtpProvider";
import PhoneNumberComponent from "./PhoneNumberComponent";

type Props = {
  forwardLink: string;
};

export default function Login({ forwardLink }: Props) {
  const { step } = useLoginOtp();

  return (
    <>
      {step === "phone" && <PhoneNumberComponent />}

      {step === "otp" && (
        <InputOTPForm forwardLink={forwardLink} />
      )}
    </>
  );
}