"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ChefHat } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (mode === "register" && !name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    const result = mode === "login" ? await login(email, password) : await register(name, email, password);
    setLoading(false);

    if (!result.success) {
      setServerError(result.error || "Something went wrong");
      return;
    }
    router.push("/");
  }

  async function handleDemoLogin() {
    setEmail("user@savorly.com");
    setPassword("User@123");
    setLoading(true);
    const result = await login("user@savorly.com", "User@123");
    setLoading(false);
    if (result.success) router.push("/");
    else setServerError("Demo login failed. Run the seed script first.");
  }

  return (
    <div className="w-full max-w-md mx-auto py-16 px-4">
      <div className="flex flex-col items-center mb-8">
        <ChefHat className="w-9 h-9 text-basil-600 mb-2" />
        <h1 className="font-display text-2xl font-semibold text-slate-800">
          {mode === "login" ? "Welcome back" : "Join Savorly"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {mode === "login" ? "Log in to add and manage your recipes" : "Create an account to start sharing recipes"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "register" && (
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        )}
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />

        {serverError && <p className="text-sm text-red-500 -mt-1">{serverError}</p>}

        <Button type="submit" loading={loading} className="w-full mt-2">
          {mode === "login" ? "Log in" : "Create account"}
        </Button>

        {mode === "login" && (
          <Button type="button" variant="ghost" onClick={handleDemoLogin} className="w-full">
            Use demo account
          </Button>
        )}
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {mode === "login" ? (
          <>Don&apos;t have an account? <Link href="/register" className="text-basil-700 font-medium">Sign up</Link></>
        ) : (
          <>Already have an account? <Link href="/login" className="text-basil-700 font-medium">Log in</Link></>
        )}
      </p>
    </div>
  );
}
