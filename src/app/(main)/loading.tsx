import { ChefHat } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: "conic-gradient(from 0deg, #3f8a44, #eaa62b, #3f8a44)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            animationDuration: "1.1s",
          }}
        />
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
          <ChefHat className="w-7 h-7 text-basil-600 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-sm text-slate-400">Cooking things up</span>
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-basil-500 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-basil-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-basil-500 animate-bounce" />
        </span>
      </div>
    </div>
  );
}
