"use client";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, User } from "lucide-react";
import { LoginForm, useUser, LoginOtpProvider } from "@repo/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Dialog,
  DialogTrigger,
  Spinner,
} from "@repo/ui";

import { useTheme } from "next-themes";

export default function Header() {
  const { setTheme } = useTheme();
  const { user, isLoading } = useUser();

  const isInvestor = user?.role === "investor";
  const profilePath = isInvestor ? "/account" : "http://localhost:4001";
  return (
    <header className="border-b py-4  border-border/40 bg-background/95  ">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="/berelian-logo.svg"
            alt="لوگوی برلیان"
            width={42}
            height={42}
            priority
            className="h-10 w-10 object-contain"
          />

          <span className="hidden text-base font-bold md:block">
            باشگاه سرمایه گذاران برلیان
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="  scale-100  rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute   scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">تغییر تم</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                روشن
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                تاریک
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                سیستم
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoading ? (
            <Spinner />
          ) : user ? (
            <Link
              href={profilePath}
              target={isInvestor ? undefined : "_blank"}
              rel={isInvestor ? undefined : "noopener noreferrer"}
            >
              <Button size="icon" variant="outline">
                <User />
              </Button>
            </Link>
          ) : (
            <LoginOtpProvider>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>ورود</Button>
                </DialogTrigger>
                <LoginForm />
              </Dialog>
            </LoginOtpProvider>
          )}
        </div>
      </div>
    </header>
  );
}
