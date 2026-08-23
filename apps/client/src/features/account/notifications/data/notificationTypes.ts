import {
  Bell,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  Gift,
  RefreshCw,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  CheckCheck,
} from "lucide-react";

export const notificationTypes = {
  birthday: {
    icon: Gift,
    className: "text-pink-500 bg-pink-50",
  },

  contract_expiry: {
    icon: RefreshCw,
    className: "text-orange-500 bg-orange-50",
  },

  contract_start: {
    icon: Calendar,
    className: "text-blue-500 bg-blue-50",
  },

  reminder: {
    icon: Bell,
    className: "text-gray-500 bg-gray-50",
  },

  request_approved: {
    icon: CheckCircle2,
    className: "text-green-500 bg-green-50",
  },

  request_rejected: {
    icon: XCircle,
    className: "text-red-500 bg-red-50",
  },

  request_completed: {
    icon: CheckCheck,
    className: "text-emerald-500 bg-emerald-50",
  },

  appointment_approved: {
    icon: CalendarCheck,
    className: "text-green-500 bg-green-50",
  },

  appointment_rejected: {
    icon: CalendarX,
    className: "text-red-500 bg-red-50",
  },

  appointment_completed: {
    icon: CheckCheck,
    className: "text-emerald-500 bg-emerald-50",
  },

  appointment_rescheduled: {
    icon: CalendarClock,
    className: "text-yellow-500 bg-yellow-50",
  },

  file_received: {
    icon: FileText,
    className: "text-purple-500 bg-purple-50",
  },
} as const;
