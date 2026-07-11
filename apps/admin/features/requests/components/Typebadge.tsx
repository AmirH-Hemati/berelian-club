import { Badge } from "@/components/ui/badge";

const typesMap = {
  consultation: {
    label: "مشاوره با مدیر سبد",
  },
  renew_contract: {
    label: "تمدید قرار داد",
  },
  increase_capital: {
    label: "افزایش سرمایه",
  },
  decrease_capital: {
    label: "کاهش سرمایه",
  },
};

type Props = { type: keyof typeof typesMap };
export default function Typebadge({ type }: Props) {
  const { label } = typesMap[type];
  return <Badge variant="secondary">{label}</Badge>;
}
