import { Badge } from "@/components/ui/badge";

type Props<T extends Record<string, { label: string }>> = {
  types: T;
  type: keyof T;
};
export default function Typebadge<T extends Record<string, { label: string }>>({
  types,
  type,
}: Props<T>) {
  const { label } = types[type];
  return <Badge variant="secondary">{label}</Badge>;
}
