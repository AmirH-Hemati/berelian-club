import { SidebarProvider } from "@/components/ui/sidebar";
import { SocketProvider } from "@/features/account/chats/components/SocketProvider";
import Navbar from "@/features/components/Navbar";
import { AppSidebar } from "@/features/components/Sidebar";
import { ReactNode } from "react";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <SocketProvider>
      <SidebarProvider dir="rtl">
        <AppSidebar />
        <main className="max-w-5xl w-full p-4 mx-auto ">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </SocketProvider>
  );
}
