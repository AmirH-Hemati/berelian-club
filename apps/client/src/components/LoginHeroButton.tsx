"use client";
import { Button, Spinner, Dialog, DialogTrigger } from "@repo/ui";
import { useUser } from "@/features/auth/hooks/useUser";
import Link from "next/link";
import Login from "@/features/auth/components/Login";

export default function LoginHeroButton() {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : user ? (
        <Button
          asChild
          size="lg"
          className="gap-2 px-8 shadow-lg shadow-primary/20"
        >
          <Link href="/account">وورد به پنل اختصاصی</Link>
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>وورد به پنل اختصاصی</Button>
          </DialogTrigger>
          <Login />
        </Dialog>
      )}
    </>
  );
}
