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
      key: "consultant",
      label: "فقط نوبت‌های من",
      type: "assignedToMe",
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
      key: "assignedTo",
      label: "فقط نوبت‌های من",
      type: "assignedToMe",
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

export const userFiltersConfig: FilterDefinition = {
  title: "فیلتر کاربران",
  description: "با استفاده از فیلترها کاربر موردنظرت رو پیدا کن.",
  filters: [
    {
      key: "role",
      label: "نقش کاربر",
      type: "multiSelect",
      options: [
        { label: "سرمایه‌گذار", value: "investor" },
        { label: "مشاور", value: "consultant" },
        { label: "مدیر", value: "reception" },
        { label: "مدیر", value: "admin" },
      ],
    },

    {
      key: "isActive",
      label: "وضعیت فعالیت",
      type: "select",
      options: [
        { label: "فعال", value: "true" },
        { label: "غیرفعال", value: "false" },
      ],
    },
    {
      key: "contractStartDate",
      label: "بازه تاریخ شروع قرارداد",
      type: "dateRange",
      placeholder: "انتخاب بازه تاریخ شروع قرارداد",
    },
    {
      key: "contractEndDate",
      label: "بازه تاریخ پایان قرارداد",
      type: "dateRange",
      placeholder: "انتخاب بازه تاریخ پایان قرارداد",
    },
  ],
};

export const fileFiltersConfig: FilterDefinition = {
  title: "فیلتر فایل‌ها",
  description: "با استفاده از فیلترها فایل موردنظرت رو پیدا کن.",
  filters: [
    {
      key: "fileType",
      label: "نوع فایل",
      type: "multiSelect",
      options: [
        { label: "تصویر", value: "image" },
        { label: "ویدئو", value: "video" },
        { label: "سند", value: "document" },
        { label: "سایر", value: "other" },
      ],
    },
    {
      key: "mimeType",
      label: "فرمت فایل",
      type: "multiSelect",
      options: [
        { label: "JPEG", value: "image/jpeg" },
        { label: "PNG", value: "image/png" },
        { label: "GIF", value: "image/gif" },
        { label: "WebP", value: "image/webp" },
        { label: "MP4", value: "video/mp4" },
        { label: "WebM", value: "video/webm" },
        { label: "PDF", value: "application/pdf" },
        { label: "Word (DOC)", value: "application/msword" },
        {
          label: "Word (DOCX)",
          value:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      ],
    },
    // {
    //   key: "size",
    //   label: "حجم فایل (بایت)",
    //   type: "numberRange",
    //   placeholder: "بازه حجم فایل",
    // },
    {
      key: "createdAt",
      label: "بازه تاریخ آپلود",
      type: "dateRange",
      placeholder: "انتخاب بازه تاریخ آپلود",
    },
  ],
};

export const followupFiltersConfig: FilterDefinition = {
  title: "فیلتر پیگیری‌ها",
  description: "با استفاده از فیلترها پیگیری موردنظرت رو پیدا کن.",
  filters: [
    {
      key: "status",
      label: "وضعیت پیگیری",
      type: "multiSelect",
      options: [
        { label: "در انتظار پیگیری", value: "pending" },
        { label: "تکمیل شده", value: "completed" },
        { label: "لغو شده", value: "cancelled" },
      ],
    },

    {
      key: "dueDate",
      label: "بازه موعد پیگیری ",
      type: "dateRange",
      placeholder: "انتخاب بازه موعد پیگیری",
    },
    {
      key: "createdAt",
      label: "بازه تاریخ ثبت پیگیری",
      type: "dateRange",
      placeholder: "انتخاب بازه تاریخ ثبت",
    },
    {
      key: "consultant",
      label: "مشاور",
      type: "combobox",
      placeholder: "جستجوی مشاور...",
    },
  ],
};
