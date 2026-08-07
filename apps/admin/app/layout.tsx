import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { ToastContainer } from "react-toastify";
import { cn } from "@repo/ui";
import { DirectionProvider } from "@repo/ui";
import { SocketProvider } from "@/features/chats/components/SocketProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "admin panel",
  description: "this is admin panel for website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body
        className={`${vazirmatn.className} antialiased `}
        suppressHydrationWarning
      >
        <DirectionProvider dir="rtl">
          <QueryProvider>
            <SocketProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}

                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={true}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </ThemeProvider>
            </SocketProvider>
          </QueryProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
