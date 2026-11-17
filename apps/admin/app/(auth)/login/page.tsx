import { LoginPage, LoginOtpProvider } from "@repo/auth";

export default function Page() {
  return (
    <LoginOtpProvider>
      <div className="flex justify-center items-center h-screen w-full p-1 ">
        <LoginPage />
      </div>
    </LoginOtpProvider>
  );
}
