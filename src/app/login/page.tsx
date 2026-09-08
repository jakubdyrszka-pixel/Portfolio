import React from "react";
import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Zaloguj się | PhysioNotes",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111111] flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <SignIn fallbackRedirectUrl="/physionotes/account" signUpUrl="/register" />
    </div>
  );
}
