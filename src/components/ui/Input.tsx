import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        className={`rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-basil-500 focus:ring-1 focus:ring-basil-500 ${
          error ? "border-red-400" : "border-slate-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <textarea
        className={`rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-basil-500 focus:ring-1 focus:ring-basil-500 ${
          error ? "border-red-400" : "border-slate-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
