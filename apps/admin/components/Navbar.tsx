"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { useLogout } from "@/features/authentication/hooks/useLogout";
import { useUser } from "@/features/authentication/hooks/useUser";
import Spinner from "./Spinner";
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
            <DropdownMenuItem>
              <Link href="/account/profile" className="flex items-center gap-2">
                <User />
                پروفایل
              </Link>
            </DropdownMenuItem>

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
