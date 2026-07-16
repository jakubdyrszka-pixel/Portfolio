import { SignUp } from '@clerk/nextjs';
import React from 'react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
      <div className="z-10">
        <SignUp path="/sign-up" routing="path" forceRedirectUrl="/physionotes" fallbackRedirectUrl="/physionotes" />
      </div>
    </div>
  );
}
