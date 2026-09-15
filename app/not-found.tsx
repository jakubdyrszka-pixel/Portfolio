import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#111111] px-4 text-center font-sans">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 mb-8">
        <FileQuestion className="h-10 w-10 text-neutral-500" />
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#111111] dark:text-white sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mb-10 max-w-md text-lg text-neutral-600 dark:text-neutral-400">
        We couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-xl bg-[#111111] dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-[#111111] transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <Link 
          href="/pl/contact" 
          className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 px-6 py-3 text-sm font-medium text-[#111111] dark:text-white transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
