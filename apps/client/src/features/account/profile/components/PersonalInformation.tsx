"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CreditCard, Mail, Phone, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FieldGroup
} from "@repo/ui";

import { updateMeSchema, updateMeTypes, UserType } from "@repo/schema";
import { useEffect } from "react";
import CustomDatePicker from "../../appointments/components/CustomDatePicker";
import { ProfileInput } from "./ProfileInput";

type Props = { user: UserType };
export default function PersonalInformation({ user }: Props) {
  const form = useForm<updateMeTypes>({
    resolver: zodResolver(updateMeSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      nationalCode: "",
      birthDate: new Date(),
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        nationalCode: user.nationalCode || "",
        birthDate: user.birthDate ? new Date(user.birthDate) : new Date(),
      });
    }
  }, [user, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>اطلاعات شخصی</CardTitle>

        <CardDescription>اطلاعات پایه کاربر</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6 flex flex-col">
          <FieldGroup>
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileInput
                control={form.control}
                name="firstName"
                label="نام"
                icon={User}
                
              />

              <ProfileInput
                control={form.control}
                name="lastName"
                label="نام خانوادگی"
                icon={User}
              />

              <ProfileInput
                control={form.control}
                name="phoneNumber"
                label="تلفن همراه"
                icon={Phone}
              />

              <ProfileInput
                control={form.control}
                name="email"
                label="ایمیل"
                icon={Mail}
                type="email"
              />

              <ProfileInput
                control={form.control}
                name="nationalCode"
                label="کد ملی"
                icon={CreditCard}
              />

              <CustomDatePicker
                control={form.control}
                name="birthDate"
                label="تاریخ تولد"
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
