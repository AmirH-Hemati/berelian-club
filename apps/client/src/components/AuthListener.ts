"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./providers/authStore";

export function AuthListener() {
  const router = useRouter();

  const status = useAuthStore((auth) => auth.status);

  useEffect(() => {
    if (status === "unAuthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return null;
}
