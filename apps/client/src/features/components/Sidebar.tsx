"use client";
import { sidebarItems } from "@/lib/constants/sidebarItems";
import { useLogout } from "@repo/auth";
import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui";
import { ChevronUp, LogOut, User, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathName = usePathname();
  const { logout, isLogouting } = useLogout();
  const { setOpenMobile } = useSidebar();
  const handleNavigation = () => {
    setOpenMobile(false);
  };
  return (
    <Sidebar side="right" collapsible="icon">
      {/* sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={handleNavigation}>
              <Link href="/account">
                <Image
                  src="/berelian-logo.svg"
                  alt="لوگوی برلیان"
                  width={42}
                  height={42}
                  priority
                  className="h-10 w-10 object-contain"
                />
                <span className="text-400 font-bold ">
                  شرکت سبدگردان برلیان
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* sidebar content */}

      <SidebarContent>
        {sidebarItems.map((item) => (
          <SidebarGroup key={item.href}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuButton
                  onClick={handleNavigation}
                  asChild
                  className={cn(
                    " h-10",
                    pathName === `/account${item.href}` && "bg-muted/50",
                  )}
                >
                  <Link href={`/account/${item.href}`}>
                    <item.icon />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup />
      </SidebarContent>

      {/* sidebar footer */}

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
                <DropdownMenuItem asChild onClick={handleNavigation}>
                  <Link
                    className="flex items-center gap-2"
                    href="/account/profile"
                  >
                    <User />
                    پروفایل
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => logout()}
                  disabled={isLogouting}
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
