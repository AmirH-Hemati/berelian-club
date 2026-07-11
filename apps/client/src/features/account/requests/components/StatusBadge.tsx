import { Badge } from "@/components/ui/badge";

const statusMap = {
  pending: {
    label: "در حال بررسی",
  },
  approved: {
    label: "تایید شده",
  },
  cancelled: {
    label: "رد شده",
  },
  completed: {
    label: "برگزار شده",
  },
};

type Props = { status: keyof typeof statusMap };
export default function StatusBadge({ status }: Props) {
  const { label } = statusMap[status];
  return (
    <Badge
      variant={
        status === "approved" ||   status === "completed" 
          ? "default"
          : status === "pending"
            ? "secondary"
            : "destructive"
      }
    >
      {label}
    </Badge>
  );
}
