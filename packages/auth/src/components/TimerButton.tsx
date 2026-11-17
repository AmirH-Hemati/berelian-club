"use client";

import { Button } from "@repo/ui";
import { useSendOtp } from "../hooks/useSendOtp";
import { useLoginOtp } from "./LoginOtpProvider";
import { useOtpTimer } from "../hooks/useOtpTimer";

export function TimerButton() {
  const { formattedTime, isExpired } = useOtpTimer();
  const { phoneNumber, setOtpExpiresAt } = useLoginOtp();
  const { sendCode, isSendingCode } = useSendOtp();

  function handleResendOtp() {
    sendCode(phoneNumber, {
      onSuccess: (response) => {
        setOtpExpiresAt(response.data.expiresAt);
      },
    });
  }

  if (!isExpired) {
    return (
      <span className="text-xs text-muted-foreground">
        ارسال مجدد کد تا {formattedTime}
      </span>
    );
  }

  return (
    <Button
      type="button"
      variant="link"
      size="sm"
      disabled={isSendingCode}
      onClick={handleResendOtp}
    >
      {isSendingCode ? "در حال ارسال..." : "ارسال مجدد کد"}
    </Button>
  );
}
