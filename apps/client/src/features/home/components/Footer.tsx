import { Mail, MapPin, Phone, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container  py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h4 className="font-semibold text-400">باشگاه مشتریان برلیان</h4>
            </div>
            <div className="space-y-3 text-300 text-muted-foreground leading-relaxed">
              <p>
                باشگاه مشتریان ما فراتر از یک پنل مدیریت دارایی، بستری برای
                <span className="text-primary font-medium">
                  {" "}
                  رشد هوشمندانه
                </span>{" "}
                سرمایه‌گذاری شماست.
              </p>
              <p>
                با عضویت در باشگاه، به ابزارهای اختصاصی، تحلیل‌های به‌روز،
                مشاوره تخصصی و امتیازات ویژه دسترسی پیدا می‌کنید.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-300">دسترسی سریع</h4>
            <ul className="space-y-3 text-200 text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  خدمات ما
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="hover:text-foreground transition-colors"
                >
                  عضویت در باشگاه
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  وبلاگ و مقالات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-300">تماس با ما</h4>
            <ul className="space-y-3 text-200 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@club.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>اصفهان، خیابان مرداویج، ساختمان برلیان </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-10 pt-6 text-center text-200 text-muted-foreground">
          <p>&copy;{year} کلیه حقوق برای باشگاه سرمایه‌گذاری برلیان محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
