"use client";

import { Button } from "@repo/ui";
import { RefreshCwIcon } from "lucide-react";
import { useSendOtp } from "../hooks/useSendOtp";

interface TimerButtonProps {
  timer: number;
  phoneNumber: string;
  onResetTimer: () => void;
}

export function TimerButton({
  timer,
  phoneNumber,
  onResetTimer,
}: TimerButtonProps) {
  const { sendCode, isSendingCode } = useSendOtp();
  const canResend = timer <= 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    if (!canResend || isSendingCode) return;
    sendCode(phoneNumber);
    onResetTimer();
  };

  return (
    <Button
      variant="outline"
      size="xs"
      onClick={handleResend}
      disabled={!canResend || isSendingCode}
    >
      <RefreshCwIcon
        className={`size-3.5 ${isSendingCode ? "animate-spin" : ""}`}
      />
      {isSendingCode
        ? "در حال ارسال..."
        : canResend
          ? "ارسال مجدد کد"
          : formatTime(timer)}
    </Button>
  );
}
