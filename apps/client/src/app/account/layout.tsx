import { SidebarProvider } from "@repo/ui";
import { AppSidebar } from "@/features/components/Sidebar";
import { ReactNode } from "react";
import Navbar from "@/features/components/Navbar";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <SidebarProvider dir="rtl">
      <AppSidebar />
      <main className="max-w-5xl w-full p-4 mx-auto ">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
