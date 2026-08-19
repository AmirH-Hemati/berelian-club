"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  SidebarTrigger,
  Spinner,
} from "@repo/ui";

import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import NotificationsDropdown from "../account/notifications/components/NotificationsDropdown";
import { useLogout, useUser } from "@repo/auth";

export default function Navbar() {
  const { user, isLoading, isError } = useUser();
  const { setTheme } = useTheme();
  const { logout, isLogouting } = useLogout();
  if (isError) return null;
  return (
    <nav className="flex items-center justify-between mb-4">
      <SidebarTrigger />
      <div className="flex items-center gap-2 md:gap-3">
        {/* notifications */}
        <NotificationsDropdown />
        {/* toggle theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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

        {/* account informations */}
        {isLoading ? (
          <Spinner />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={`http://localhost:5000/images/users/${user?.photo}`}
                />
                <AvatarFallback>
                  {user?.firstName?.[0] + user?.lastName?.[0]}
                </AvatarFallback>{" "}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-44" sideOffset={15}>
              <DropdownMenuItem>
                <Link
                  href="/account/profile"
                  className="flex items-center gap-2"
                >
                  <User />
                  پروفایل
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                onClick={() => logout()}
                disabled={isLogouting}
              >
                <LogOut />
                خروج از حساب کاربری
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
