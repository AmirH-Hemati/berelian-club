"use client";
import Link from "next/link";
import { Moon, Sun, TrendingUp, User } from "lucide-react";
import Login from "@/features/auth/components/Login";
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
import { useUser } from "@/features/auth/hooks/useUser";

export default function Header() {
  const { setTheme } = useTheme();
  const { user, isLoading } = useUser();
  return (
    <header className="border-b py-4  border-border/40 bg-background/95  ">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2  font-bold">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="md:block hidden text-300">
            باشگاه مشتریان برلیان
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
            <Link href="/account">
              <Button size="icon" variant="outline">
                <User />
              </Button>
            </Link>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>ورود</Button>
              </DialogTrigger>
              <Login />
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}
