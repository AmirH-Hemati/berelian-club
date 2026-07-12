"use client";

// import { useLogout } from "@/features/authentication/hooks/useLogout";
import { sidebarData } from "@/lib/constanst/SidebarItem";
import { ChevronUp, Gem, LogOut, User, User2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
} from "./ui/sidebar";

export default function AppSidebar() {
  // const { logout, isPending } = useLogout();

  // function handelLogout() {
  //   logout();
  // }
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
            <SidebarMenuButton asChild>
              <Link href="/">
                <Gem />
                <span className="text-lg font-bold ">پنل ادمین برلیان</span>
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
                  <SidebarMenuButton asChild>
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
                    className="flex items-center gap-2"
                    href="/account/profile"
                  >
                    <User />
                    پروفایل
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
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
