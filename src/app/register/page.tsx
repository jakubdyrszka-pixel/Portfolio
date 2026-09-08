import React from "react";
import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Zarejestruj się | PhysioNotes",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111111] flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <SignUp fallbackRedirectUrl="/physionotes/account" signInUrl="/login" />
    </div>
  );
}
