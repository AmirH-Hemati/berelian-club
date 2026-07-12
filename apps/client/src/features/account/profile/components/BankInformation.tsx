"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { UserType } from "@repo/schema";
import { Banknote } from "lucide-react";

type Props = { user: UserType };
export default function BankInformation({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>اطلاعات بانکی</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-200 font-medium">شماره حساب</label>

            <InputGroup>
              <InputGroupAddon>
                <Banknote className="size-4" />
              </InputGroupAddon>

              <InputGroupInput disabled value={user.bankAccountNumber} />
            </InputGroup>
          </div>

          <div>
            <label className="mb-1 block text-200 font-medium">شماره شبا</label>

            <InputGroup>
              <InputGroupAddon>
                <Banknote className="size-4" />
              </InputGroupAddon>

              <InputGroupInput disabled value={user.shabaNumber} />
            </InputGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
