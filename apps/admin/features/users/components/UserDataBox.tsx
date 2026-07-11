import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SendFileModal } from "@/features/files/components/SendFileModal";
import { UserType } from "@repo/schema";
import { User as UserIcon } from "lucide-react";
import AccountInformation from "./AccountInformation";
import EditUserDialog from "./EditUserDialog";

type Props = { user: UserType };
export default function UserDataBox({ user }: Props) {
  return (
    <Card>
      <CardHeader className="flex gap-3 flex-col md:flex-row md:items-center justify-between">
        <CardTitle className="flex items-center gap-1 ">
          <UserIcon className="size-4 text-muted-foreground" />
          اطلاعات شخصی کاربر
        </CardTitle>
        <div className="flex flex-col w-full md:flex-row  gap-2 flex-1 justify-end items-center">
          <SendFileModal userId={user._id} userName={user.firstName} />
          <EditUserDialog user={user} />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
      
          <div className="flex items-center gap-2  ">
            <Avatar className="size-10 ring-2 ring-primary/10">
              <AvatarImage
                alt="avatar user image"
                src={`http://localhost:3000/img/users/${user.photo}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-base font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs text-muted-foreground">
                شناسه: {user._id?.slice(-8)}
              </p>
            </div>
          </div>

          <AccountInformation user={user} />
    
      </CardContent>
    </Card>
  );
}
