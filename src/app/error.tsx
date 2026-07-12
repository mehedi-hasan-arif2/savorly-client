"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-honey-50 flex items-center justify-center mb-6">
        <AlertTriangle className="w-9 h-9 text-honey-500 animate-pulse" />
      </div>

      <h1 className="font-display text-2xl font-semibold text-slate-800 mb-2">Something burned in the kitchen</h1>
      <p className="text-slate-500 text-sm mb-8 max-w-sm">
        An unexpected error occurred. Try again, or head back to the homepage.
      </p>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-basil-600 hover:bg-basil-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
        >
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
