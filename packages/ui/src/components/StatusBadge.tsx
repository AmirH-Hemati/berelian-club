import { Badge } from "./ui/badge";

const statusMap = {
  pending: {
    label: "در حال بررسی",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400",
  },

  approved: {
    label: "تایید شده",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400",
  },

  cancelled: {
    label: "لغو شده",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400",
  },

  completed: {
    label: "برگزار شده",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400",
  },
} as const;

type Props = {
  status: keyof typeof statusMap;
};

export default function StatusBadge({ status }: Props) {
  const { label, className } = statusMap[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
