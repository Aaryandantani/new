"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.unverified) {
          toast.info("Account not verified. Redirecting...");
          sessionStorage.setItem("verify_email", email as string);
          router.push("/auth/verify-otp");
          return;
        }
        throw new Error(data.error || "Login failed");
      }

      toast.success("Welcome back!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-serif font-medium text-white animate-auth-slide-down">
          Welcome Back
        </h2>
        <p className="text-white/55 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] uppercase animate-auth-fade-delay-1">
          Please sign in to your account
        </p>
        <div className="h-px w-10 bg-accent/70 mx-auto mt-3 animate-auth-fade-delay-2" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2 animate-auth-slide-up-1">
          <Label
            htmlFor="email"
            className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest"
          >
            Email Address
          </Label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 transition-all duration-300 group-focus-within:text-accent" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              className="bg-white/8 border-white/15 text-white placeholder:text-white/25 pl-10 h-12
                       focus:ring-2 focus:ring-accent/40 focus:border-accent/60 focus:bg-white/12
                       transition-all duration-300 hover:bg-white/12 hover:border-white/25
                       rounded-xl font-[family-name:var(--font-montserrat)] text-sm"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2 animate-auth-slide-up-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest"
            >
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-accent/80 hover:text-accent font-[family-name:var(--font-montserrat)] font-medium transition-all duration-300 hover:underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 transition-all duration-300 group-focus-within:text-accent" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className="bg-white/8 border-white/15 text-white placeholder:text-white/25 pl-10 pr-11 h-12
                       focus:ring-2 focus:ring-accent/40 focus:border-accent/60 focus:bg-white/12
                       transition-all duration-300 hover:bg-white/12 hover:border-white/25
                       rounded-xl font-[family-name:var(--font-montserrat)] text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2 animate-auth-slide-up-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded border-white/20 bg-white/10 accent-accent"
          />
          <label
            htmlFor="remember"
            className="text-white/50 text-xs font-[family-name:var(--font-montserrat)] cursor-pointer hover:text-white/70 transition-colors"
          >
            Remember me for 30 days
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-white font-[family-name:var(--font-montserrat)]
                   uppercase tracking-[0.15em] text-xs h-12 mt-2 group relative overflow-hidden
                   rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                   hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]
                   disabled:opacity-60 disabled:cursor-not-allowed animate-auth-slide-up-3"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </span>
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 animate-auth-fade-delay-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs font-[family-name:var(--font-montserrat)] uppercase tracking-widest">
          or
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Register link */}
      <div className="text-center animate-auth-fade-delay-5">
        <p className="text-white/50 text-sm font-[family-name:var(--font-montserrat)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-accent hover:text-accent/80 font-semibold transition-all duration-300 hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}