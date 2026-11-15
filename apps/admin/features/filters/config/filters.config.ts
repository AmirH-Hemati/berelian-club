import { FilterDefinition } from "../types/filters.types";

export const appointmentFiltersConfig: FilterDefinition = {
  title: "فیلتر نوبت‌ها",
  description: "با استفاده از فیلترها نوبت موردنظرت رو پیدا کن.",
  filters: [
    {
      key: "status",
      label: "وضعیت نوبت",
      type: "multiSelect",
      options: [
        { label: "در انتظار بررسی", value: "pending" },
        { label: "تأیید شده", value: "approved" },
        { label: "کامل شده", value: "completed" },
        { label: "لغو شده", value: "cancelled" },
      ],
    },
    {
      key: "type",
      label: "نوع مشاوره",
      type: "multiSelect",
      options: [
        { label: "تلفنی", value: "phone" },
        { label: "آنلاین", value: "online" },
      ],
    },
    {
      key: "appointmentDate",
      label: "بازه تاریخ نوبت",
      type: "dateRange",
      placeholder: "انتخاب بازه تاریخ",
    },
    {
      key: "investor",
      label: "سرمایه گذار",
      type: "combobox",
      placeholder: "جستجوی سرمایه گذاران...",
    },
    {
      key: "consultant",
      label: "مشاور",
      type: "combobox",
      placeholder: "جستجوی مشاور...",
    },
  ],
};
