import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/utils/helper";
import { UserType } from "@repo/schema";
import { FileCheck } from "lucide-react";

type Props = { user: UserType };
export default function ContractStatus({ user }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex items-start  justify-between">
        <CardTitle className="flex items-center gap-1 text-300 ">
          <FileCheck />
          <span> وضعیت قرارداد</span>
        </CardTitle>

        <Badge variant={user.contractStatus ? "default" : "destructive"}>
          {user.contractStatus ? "فعال" : "غیر فعال"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-300">
          <span className="text-muted-foreground">شروع قرارداد</span>
          <span className="font-medium">
            {formatDate(user.contractStartDate)}
          </span>
        </div>
        <div className="flex justify-between text-300">
          <span className="text-muted-foreground">پایان قرارداد</span>
          <span className="font-medium">
            {formatDate(user.contractEndDate)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-300">
            <span className="text-muted-foreground"> سپری شده</span>
            <span className="font-medium text-primary">۶۷٪</span>
          </div>
          <Progress value={67} />
          <div className="flex justify-between text-200 text-muted-foreground">
            <span>پایان</span>
            <span>{user.contractDaysRemaining} روز باقی‌مانده</span>
            <span>شروع</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
