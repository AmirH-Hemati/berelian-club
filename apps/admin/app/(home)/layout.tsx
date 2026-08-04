import { SidebarProvider } from "@repo/ui";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

        <main className="mx-auto max-w-7xl w-full overflow-x-hidden">
          <Navbar />
          <div className="px-4">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
