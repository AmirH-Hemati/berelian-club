import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProviders";
import { DirectionProvider } from "@repo/ui";
import { cn } from "@repo/ui";
import { Vazirmatn } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryClientProvider";
import { AuthListener } from "@/components/AuthListener";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: {
    default: "باشگاه سرمایه گذارانان برلیان",
    template: "%s | باشگاه سرمایه گذارانان برلیان",
  },
  description:
    "باشگاه سرمایه گذارانان برلیان؛ مدیریت قراردادها، مشاهده وضعیت قرارداد، پیگیری درخواست‌ها، اعلان‌ها و بهره‌مندی از خدمات اختصاصی اعضا.",
  applicationName: "باشگاه سرمایه گذارانان برلیان",
  keywords: [
    "برلیان",
    "باشگاه سرمایه گذارانان",
    "سرمایه گذاری",
    "مدیریت قرارداد",
    "اعلان ها",
  ],
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
      className="scroll-smooth"
    >
      <body
        suppressHydrationWarning
        className={cn(vazirmatn.className, "antialiased")}
      >
        <QueryProvider>
          <AuthListener />
          <DirectionProvider dir="rtl">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </DirectionProvider>
        </QueryProvider>
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
        />
      </body>
    </html>
  );
}
