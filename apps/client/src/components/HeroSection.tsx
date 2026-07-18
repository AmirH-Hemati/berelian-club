import Dashboard from "@/features/home/components/Dashboard";

import LoginHeroButton from "./LoginHeroButton";

export default function HeroSection() {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-center">
        <div className="space-y-6 flex flex-col items-center lg:items-start">
          <h1 className="text-700 font-black tracking-tight leading-tight">
            سرمایه‌گذاری شما،
            <br />
            <span className="bg-linear-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent">
              ارزش‌آفرینی ماست
            </span>
          </h1>

          <p className="text-400 text-muted-foreground max-w-lg leading-relaxed">
            ابزارهای اختصاصی، تحلیل‌های به‌روز و امتیازات ویژه در کنار تیم
            حرفه‌ای ما، مسیر رشد مالی شما را هموار می‌کند.
          </p>
          <LoginHeroButton />

          <div className="flex items-center gap-6  text-muted-foreground pt-2">
            <div>
              <span className="text-500 font-bold  block">۱۲+</span>
              <span>سال تجربه</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <span className="text-500 font-bold  block">۱۵۰۰+</span>
              <span>عضو فعال</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <span className="text-500 font-bold  block">۹۸٪</span>
              <span>رضایت</span>
            </div>
          </div>
        </div>

        <div className="relative ">
          <div className="absolute -inset-4 bg-linear-to-r from-primary/10 to-transparent blur-3xl" />
          <Dashboard />
        </div>
      </div>
    </section>
  );
}
