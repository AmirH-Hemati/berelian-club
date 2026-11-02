import { SidebarProvider } from "@repo/ui";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { AuthListener } from "@/components/AuthListener";
import { SocketProvider } from "@repo/chat";
import { ChatNotificationListener } from "@/features/notifications/components/ChatNotificationListener";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <SocketProvider>
          <ChatNotificationListener />
          <AuthListener />
          <AppSidebar />

          <main className="mx-auto max-w-7xl w-full overflow-x-hidden">
            <Navbar />
            <div className="px-4">{children}</div>
          </main>
        </SocketProvider>
      </SidebarProvider>
    </>
  );
}
