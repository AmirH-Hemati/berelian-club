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

export const requestFiltersConfig: FilterDefinition = {
  title: "فیلتر درخواست‌ها",
  description: "با استفاده از فیلترها درخواست موردنظرت رو پیدا کن.",
  filters: [
    {
      key: "status",
      label: "وضعیت درخواست",
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
      label: "نوع درخواست",
      type: "multiSelect",
      options: [
        { label: "تمدید قرارداد", value: "renew_contract" },
        { label: "افزایش سرمایه", value: "increase_capital" },
        { label: "کاهش سرمایه", value: "decrease_capital" },
      ],
    },
    {
      key: "createdAt",
      label: "بازه تاریخ ثبت درخواست",
      type: "dateRange",
      placeholder: "انتخاب بازه تاریخ ثبت درخواست",
    },
    {
      key: "investor",
      label: "سرمایه‌گذار",
      type: "combobox",
      placeholder: "جستجوی سرمایه‌گذاران...",
    },
    {
      key: "assignedTo",
      label: "پذیرش‌کننده درخواست",
      type: "combobox",
      placeholder: "جستجوی پذیرش‌کنندگان...",
    },
  ],
};
