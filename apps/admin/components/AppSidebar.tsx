"use client";

import { sidebarData } from "@/lib/constanst/SidebarItem";
import { ChevronUp, LogOut, User2, UserRound } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@repo/ui";
import { useLogout } from "@repo/auth";
import Image from "next/image";

export default function AppSidebar() {
  const { logout, isLogouting } = useLogout();
  const { setOpenMobile } = useSidebar();

  function handleNavigation() {
    setOpenMobile(false);
  }

  return (
    <Sidebar
      collapsible="icon"
      side="right"
      className="overflow-hidden border-none"
    >
      {/* sidebar header  */}

      <SidebarHeader className="py-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={handleNavigation}>
              <Link href="/">
                <Image
                  src="/berelian-logo.svg"
                  alt="لوگوی برلیان"
                  width={42}
                  height={42}
                  priority
                  className="h-10 w-10 object-contain"
                />
                <span className="text-400 font-bold ">پنل ادمین برلیان</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* sidebar seprator  */}
      <SidebarSeparator />

      {/* sidebar content */}
      <SidebarContent>
        {sidebarData.map((data, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={handleNavigation}>
                    <Link href={data.href}>
                      <data.icon />
                      {data.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* sidebat footer  */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> امیر حسین همتی
                  <ChevronUp />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <UserRound className="size-4" />
                    پروفایل
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={isLogouting}
                  onClick={() => logout()}
                  variant="destructive"
                  className="w-52"
                >
                  <LogOut />
                  خروج از حساب کاربری
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
