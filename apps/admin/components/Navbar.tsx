"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { Button } from "@repo/ui";
import { SidebarTrigger } from "@repo/ui";
import { useLogout, useUser } from "@repo/auth";
import { Spinner } from "@repo/ui";
export default function Navbar() {
  const { user, isLoading } = useUser();
  const { setTheme } = useTheme();
  const { logout, isLogouting } = useLogout();

  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 bg-background z-10">
      {/* left */}

      <SidebarTrigger />

      {/* right*/}

      <div className="flex items-center gap-2 md:gap-4">
        {/* theme */}

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

        {/* account information */}
        <DropdownMenu>
          {isLoading ? (
            <Spinner />
          ) : (
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar>
                <AvatarImage src={user?.photo || ""} />
                <AvatarFallback>
                  {user?.firstName[0] + user?.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent className=" w-44" sideOffset={15}>
            <DropdownMenuItem
              variant="destructive"
              disabled={isLogouting}
              onClick={() => logout()}
            >
              <LogOut />
              خروج از حساب کاربری
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
