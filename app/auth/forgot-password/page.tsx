"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1800);
  };

  if (isSent) {
    return (
      <div className="space-y-8 text-center animate-auth-scale-in">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center animate-float">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping-slow" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-serif font-medium text-white">Check Your Email</h2>
          <p className="text-white/60 font-[family-name:var(--font-montserrat)] text-sm leading-relaxed">
            We&apos;ve sent a verification code to
          </p>
          <p className="text-accent font-[family-name:var(--font-montserrat)] text-sm font-semibold">
            {email}
          </p>
        </div>

        <Button
          onClick={() => router.push("/auth/verify-otp")}
          className="w-full bg-accent hover:bg-accent/90 text-white font-[family-name:var(--font-montserrat)]
                   uppercase tracking-[0.15em] text-xs h-12 group relative overflow-hidden
                   rounded-xl transition-all duration-300 hover:shadow-accent/30 hover:shadow-lg
                   hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center justify-center gap-2">
            Enter Verification Code
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Button>

        <p className="text-white/40 text-xs font-[family-name:var(--font-montserrat)]">
          Didn&apos;t receive it?{" "}
          <button
            onClick={() => setIsSent(false)}
            className="text-accent/70 hover:text-accent transition-colors underline underline-offset-4"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-serif font-medium text-white animate-auth-slide-down">
          Forgot Password?
        </h2>
        <p className="text-white/55 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] uppercase animate-auth-fade-delay-1">
          No worries, we&apos;ll help you reset it
        </p>
        <div className="h-px w-10 bg-accent/70 mx-auto mt-3 animate-auth-fade-delay-2" />
      </div>

      {/* Info box */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 animate-auth-slide-up-1">
        <p className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs leading-relaxed">
          Enter the email address associated with your account and we&apos;ll send you a 6-digit verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2 animate-auth-slide-up-2">
          <Label htmlFor="email" className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest">
            Email Address
          </Label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 transition-all duration-300 group-focus-within:text-accent" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/8 border-white/15 text-white placeholder:text-white/25 pl-10 h-12
                       focus:ring-2 focus:ring-accent/40 focus:border-accent/60 focus:bg-white/12
                       transition-all duration-300 hover:bg-white/12 hover:border-white/25
                       rounded-xl font-[family-name:var(--font-montserrat)] text-sm"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-white font-[family-name:var(--font-montserrat)]
                   uppercase tracking-[0.15em] text-xs h-12 group relative overflow-hidden
                   rounded-xl transition-all duration-300 hover:shadow-accent/30 hover:shadow-lg
                   hover:scale-[1.02] active:scale-[0.98]
                   disabled:opacity-60 disabled:cursor-not-allowed animate-auth-slide-up-3"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending Code...
              </>
            ) : (
              <>
                Send Reset Code
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </>
            )}
          </span>
        </Button>
      </form>

      {/* Back to login */}
      <div className="text-center pt-4 border-t border-white/10 animate-auth-fade-delay-4">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-[family-name:var(--font-montserrat)] transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
