import Link from "next/link";
import { ChefHat, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="relative w-24 h-24 flex items-center justify-center mb-6">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: "conic-gradient(from 0deg, #3f8a44, #eaa62b, #3f8a44)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            animationDuration: "3s",
          }}
        />
        <div className="w-[72px] h-[72px] rounded-full bg-basil-50 flex items-center justify-center">
          <ChefHat className="w-8 h-8 text-basil-500 animate-bounce" />
        </div>
        <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-honey-400 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
          404
        </span>
      </div>

      <h1 className="font-display text-2xl font-semibold text-slate-800 mb-2">This recipe went missing</h1>
      <p className="text-slate-500 text-sm mb-8 max-w-sm">
        The page you're looking for isn't on the menu. It may have been moved or never existed.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-basil-600 hover:bg-basil-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-basil-600/30"
      >
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>
    </div>
  );
}
