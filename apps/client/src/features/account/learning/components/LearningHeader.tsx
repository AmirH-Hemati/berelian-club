import { BookOpen } from "lucide-react";

export default function LearningHeader() {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="size-5" />
        </div>

        <div>
          <h2 className="text-base font-bold text-foreground">
            محتوای آموزشی من
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            فایل‌ها و منابع آموزشی ارسال‌شده برای شما
          </p>
        </div>
      </div>
    </div>
  );
}
