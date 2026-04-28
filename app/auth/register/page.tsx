"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Check, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];
  const strength = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-400", "bg-yellow-400", "bg-accent"];

  if (!password) return null;

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < strength ? colors[strength - 1] : "bg-white/15"
            }`}
          />
        ))}
      </div>
      <div className="flex gap-3">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`flex items-center gap-1 text-xs font-[family-name:var(--font-montserrat)] transition-colors duration-300 ${
              c.pass ? "text-accent" : "text-white/30"
            }`}
          >
            {c.pass ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Account created! Please verify your email.");
      // Store email for verification page
      sessionStorage.setItem("verify_email", email as string);
      
      router.push("/auth/verify-otp");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-serif font-medium text-white animate-auth-slide-down">
          Create Account
        </h2>
        <p className="text-white/55 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] uppercase animate-auth-fade-delay-1">
          Begin your journey to paradise
        </p>
        <div className="h-px w-10 bg-accent/70 mx-auto mt-3 animate-auth-fade-delay-2" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2 animate-auth-slide-up-1">
          <Label htmlFor="name" className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest">
            Full Name
          </Label>
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 transition-all duration-300 group-focus-within:text-accent" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className="bg-white/8 border-white/15 text-white placeholder:text-white/25 pl-10 h-12
                       focus:ring-2 focus:ring-accent/40 focus:border-accent/60 focus:bg-white/12
                       transition-all duration-300 hover:bg-white/12 hover:border-white/25
                       rounded-xl font-[family-name:var(--font-montserrat)] text-sm"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2 animate-auth-slide-up-2">
          <Label htmlFor="email" className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest">
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

        {/* Password with strength meter */}
        <div className="space-y-2 animate-auth-slide-up-3">
          <Label htmlFor="password" className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest">
            Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 transition-all duration-300 group-focus-within:text-accent" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <PasswordStrength password={password} />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-white font-[family-name:var(--font-montserrat)]
                   uppercase tracking-[0.15em] text-xs h-12 mt-2 group relative overflow-hidden
                   rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                   hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]
                   disabled:opacity-60 disabled:cursor-not-allowed animate-auth-slide-up-4"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </span>
        </Button>
      </form>

      {/* Login link */}
      <div className="text-center pt-4 border-t border-white/10 animate-auth-fade-delay-5">
        <p className="text-white/50 text-sm font-[family-name:var(--font-montserrat)]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-accent hover:text-accent/80 font-semibold transition-all duration-300 hover:underline underline-offset-4"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}