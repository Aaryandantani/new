"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordsMismatch = newPassword && confirmPassword && newPassword !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1800);
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-8 animate-auth-scale-in">
        {/* Animated success */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-accent/15 flex items-center justify-center animate-float">
              <ShieldCheck className="w-12 h-12 text-accent" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping-slow" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-serif font-medium text-white">Password Reset!</h2>
          <p className="text-white/60 font-[family-name:var(--font-montserrat)] text-sm leading-relaxed">
            Your password has been updated successfully. You can now sign in with your new password.
          </p>
        </div>

        {/* Success checklist */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-left space-y-2">
          {["Password updated securely", "All sessions logged out", "Email confirmation sent"].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs">{item}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => router.push("/auth/login")}
          className="w-full bg-accent hover:bg-accent/90 text-white font-[family-name:var(--font-montserrat)]
                   uppercase tracking-[0.15em] text-xs h-12 group relative overflow-hidden
                   rounded-xl transition-all duration-300 hover:shadow-accent/30 hover:shadow-lg
                   hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center justify-center gap-2">
            Back to Login
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-serif font-medium text-white animate-auth-slide-down">
          Set New Password
        </h2>
        <p className="text-white/55 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] uppercase animate-auth-fade-delay-1">
          Choose a strong new password
        </p>
        <div className="h-px w-10 bg-accent/70 mx-auto mt-3 animate-auth-fade-delay-2" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New password */}
        <div className="space-y-2 animate-auth-slide-up-1">
          <Label htmlFor="password" className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest">
            New Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 transition-all duration-300 group-focus-within:text-accent" />
            <Input
              id="password"
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white/8 border-white/15 text-white placeholder:text-white/25 pl-10 pr-11 h-12
                       focus:ring-2 focus:ring-accent/40 focus:border-accent/60 focus:bg-white/12
                       transition-all duration-300 hover:bg-white/12 hover:border-white/25
                       rounded-xl font-[family-name:var(--font-montserrat)] text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200"
              tabIndex={-1}
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div className="space-y-2 animate-auth-slide-up-2">
          <Label htmlFor="confirmPassword" className="text-white/70 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest">
            Confirm Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 transition-all duration-300 group-focus-within:text-accent" />
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`bg-white/8 text-white placeholder:text-white/25 pl-10 pr-11 h-12
                       focus:ring-2 focus:bg-white/12
                       transition-all duration-300 hover:bg-white/12
                       rounded-xl font-[family-name:var(--font-montserrat)] text-sm
                       ${passwordsMismatch
                         ? "border-red-400/60 focus:ring-red-400/30 focus:border-red-400/60"
                         : passwordsMatch
                         ? "border-accent/60 focus:ring-accent/30 focus:border-accent/60"
                         : "border-white/15 hover:border-white/25"
                       }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Match indicator */}
          {passwordsMismatch && (
            <p className="text-red-400 text-xs font-[family-name:var(--font-montserrat)] animate-fade-in">
              Passwords do not match
            </p>
          )}
          {passwordsMatch && (
            <p className="text-accent text-xs font-[family-name:var(--font-montserrat)] flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-3 h-3" /> Passwords match
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!passwordsMatch || isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-white font-[family-name:var(--font-montserrat)]
                   uppercase tracking-[0.15em] text-xs h-12 mt-2 group relative overflow-hidden
                   rounded-xl transition-all duration-300 hover:shadow-accent/30 hover:shadow-lg
                   hover:scale-[1.02] active:scale-[0.98]
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                   animate-auth-slide-up-3"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </span>
        </Button>
      </form>
    </div>
  );
}
