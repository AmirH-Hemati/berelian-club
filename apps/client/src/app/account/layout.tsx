import { SidebarProvider } from "@repo/ui";
import { AppSidebar } from "@/features/components/Sidebar";
import { ReactNode, Suspense } from "react";
import Navbar from "@/features/components/Navbar";
import { SocketProvider } from "@repo/chat";
import { ChatNotificationListener } from "@/features/account/notifications/components/ChatNotificationListener";
type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <SidebarProvider dir="rtl">
      <SocketProvider>
        <Suspense fallback={null}>
          <ChatNotificationListener />
        </Suspense>
        <AppSidebar />
        <main className="mx-auto p-4 max-w-7xl w-full overflow-x-hidden">
          <Navbar />
          {children}
        </main>
      </SocketProvider>
    </SidebarProvider>
  );
}
