"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
// import { useLogout } from "@/features/authentication/hooks/useLogout";
export default function Navbar() {
  const { setTheme } = useTheme();
  // const { logout, isPending } = useLogout();
  // function handelLogout() {
  //   logout();
  // }
  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 bg-background z-10">
      {/* left */}

      <SidebarTrigger />

      {/* right*/}

      <div className="flex items-center gap-2 md:gap-4">
        {/* searchBar */}
        {/* <SearchFilter /> */}
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
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" />
              <AvatarFallback>pr</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-44" sideOffset={15}>
            <DropdownMenuItem>
              <Link href="/account/profile" className="flex items-center gap-2">
                <User />
                پروفایل
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive">
              <LogOut />
              خروج از حساب کاربری
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
