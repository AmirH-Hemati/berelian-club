import { Badge } from "@repo/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Progress } from "@repo/ui";
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
          <div className="flex justify-between">
            <span className=" text-muted-foreground">سپری شده</span>
            <span>{user?.contractProgress}%</span>
          </div>
          <Progress value={user?.contractProgress} />
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
