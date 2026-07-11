"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background to-muted/30">
      <Card className="max-w-md w-full shadow-lg border-border/50">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            مشکلی پیش آمده!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <div className="bg-muted/30 rounded-lg p-4 ">
            <p className="text-sm text-muted-foreground  break-all text-center">
              {error.message || "خطای ناشناخته"}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground/70 mt-2">
                شناسه خطا: {error.digest}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center">
            متأسفیم، خطایی رخ داده است. لطفاً دوباره تلاش کنید یا به صفحه اصلی
            بازگردید.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCw className="size-4" />
            دوباره تلاش کن
          </Button>
          <Button asChild variant="outline" className="gap-2 w-full sm:w-auto">
            <Link href="/">
              <Home className="size-4" />
              صفحه اصلی
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
