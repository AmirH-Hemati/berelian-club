"use client";

import { useEffect, useState } from "react";
import { useLoginOtp } from "../components/LoginOtpProvider";

export function useOtpTimer() {
  const { otpExpiresAt } = useLoginOtp();

  const getRemainingSeconds = () => {
    if (!otpExpiresAt) return 0;

    const remaining = new Date(otpExpiresAt).getTime() - Date.now();

    return Math.max(0, Math.ceil(remaining / 1000));
  };

  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    setRemainingSeconds(getRemainingSeconds());

    if (!otpExpiresAt) return;

    const interval = setInterval(() => {
      setRemainingSeconds(getRemainingSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, [otpExpiresAt]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return {
    remainingSeconds,
    formattedTime,
    isExpired: remainingSeconds === 0,
  };
}
