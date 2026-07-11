import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
}

export default function Button({ children, variant = "primary", loading, className = "", disabled, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-basil-600 text-white hover:bg-basil-700",
    secondary: "bg-honey-400 text-white hover:bg-honey-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent text-basil-700 border border-basil-200 hover:bg-basil-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? "Please wait..." : children}
    </button>
  );
}
