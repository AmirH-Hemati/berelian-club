"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    id: 1,
    question: "باشگاه سرمایه‌گذاری چیه و چیکار میکنه؟",
    answer:
      "باشگاه سرمایه‌گذاری یه بستر حرفه‌ای برای مدیریت سرمایه، مشاوره مالی و دسترسی به ابزارهای هوشمند سرمایه‌گذاری هست. ما به شما کمک می‌کنیم تا سرمایه‌تون رو به بهترین شکل مدیریت کنید و به اهداف مالی‌تون برسید.",
  },
  {
    id: 2,
    question: "عضویت در باشگاه چه مزایایی داره؟",
    answer:
      "با عضویت در باشگاه به ابزارهای اختصاصی مدیریت سرمایه، تحلیل‌های به‌روز بازار، جلسات مشاوره تخصصی با مدیران سبد، امتیازات ویژه، دسترسی به فایل‌های آموزشی و پشتیبانی ۲۴ ساعته دسترسی پیدا می‌کنید.",
  },
  {
    id: 3,
    question: "حداقل سرمایه برای شروع چقدره؟",
    answer:
      "حداقل سرمایه برای شروع بستگی به نوع سبد سرمایه‌ای و استراتژی شما داره. تیم مشاوره ما بعد از بررسی شرایط شما، بهترین گزینه رو پیشنهاد میده.",
  },
  {
    id: 4,
    question: "چطور  سبد سرمایه‌ایم رو مدیریت کنم؟",
    answer:
      "از طریق پنل کاربری اختصاصی، می‌تونید وضعیت سبد سرمایه‌ای خودتون رو مشاهده کنید، درخواست افزایش یا کاهش سرمایه بدید، قراردادها رو مدیریت کنید و گزارش‌های ماهانه رو دریافت کنید.",
  },
  {
    id: 5,
    question: "چطور میتونم جلسه مشاوره رزرو کنم؟",
    answer:
      "از طریق پنل کاربری، بخش 'رزرو مشاوره' می‌تونید تاریخ و زمان مورد نظرتون رو انتخاب کنید و جلسه مشاوره آنلاین یا حضوری با مدیر سبد خودتون رو رزرو کنید.",
  },
  {
    id: 6,
    question: "اطلاعات مالی من چقدر امنه؟",
    answer:
      "همه اطلاعات مالی و شخصی شما با بالاترین سطح امنیت و رمزگذاری ذخیره میشن. ما از پروتکل‌های امنیتی پیشرفته استفاده می‌کنیم و هیچ اطلاعاتی با شخص ثالث به اشتراک گذاشته نمیشه.",
  },
];

export default function FAQ() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2 ">
          <HelpCircle className="size-6 text-primary" />
          <h2 className="text-500 font-semibold">سوالات متداول</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl ">
          پاسخ سوالاتی که ممکنه براتون پیش بیاد
        </p>
      </div>

      <div className="columns-1 lg:columns-2 ">
        {faqs.map((faq) => {
          return (
            <Collapsible
              key={faq.id}
              className="rounded-md data-[state=open]:bg-muted break-inside-avoid mb-3"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="group w-full py-6 px-3 bg-secondary/50"
                >
                  {faq.question}

                  <ChevronDown
                    className={cn(
                      " mr-auto group-data-[state=open]:rotate-180",
                    )}
                  />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-5 pb-4">
                <p className="text-200 text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
                  {faq.answer}
                </p>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </section>
  );
}
