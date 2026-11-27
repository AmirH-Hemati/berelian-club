export const PERMISSIONS = [
  // Users
  {
    key: "users.read",
    name: "مشاهده کاربران",
    group: "users",
  },
  {
    key: "users.create",
    name: "ایجاد کاربر",
    group: "users",
  },
  {
    key: "users.update",
    name: "ویرایش کاربر",
    group: "users",
  },
  {
    key: "users.delete",
    name: "حذف کاربر",
    group: "users",
  },

  // Requests
  {
    key: "requests.read",
    name: "مشاهده درخواست‌ها",
    group: "requests",
  },
  {
    key: "requests.approve",
    name: "تأیید درخواست",
    group: "requests",
  },
  {
    key: "requests.reject",
    name: "رد درخواست",
    group: "requests",
  },

  // Appointments
  {
    key: "appointments.read",
    name: "مشاهده نوبت‌ها",
    group: "appointments",
  },
  {
    key: "appointments.create",
    name: "ایجاد نوبت",
    group: "appointments",
  },
  {
    key: "appointments.update",
    name: "ویرایش نوبت",
    group: "appointments",
  },
];

export const ROLE_PERMISSION_PRESETS = {
  admin: [],

  investor: [
    "profile.read",
    "profile.update",
    "appointments.create",
    "appointments.read",
  ],

  reception: [
    "users.read",
    "requests.read",
    "requests.update",
    "appointments.read",
  ],

  consultant: [
    "users.read",
    "appointments.read",
    "reports.create",
    "reports.read",
  ],
} as const;
