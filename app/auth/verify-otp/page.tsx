"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    setIsLoading(true);

    const email = sessionStorage.getItem("verify_email");
    if (!email) {
      toast.error("Email not found. Please register again.");
      router.push("/auth/register");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      toast.success("Account verified! Welcome to Serenity Bay.");
      sessionStorage.removeItem("verify_email");
      router.push("/"); // Redirect to home or dashboard
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp("");
  };

  const progress = ((60 - timeLeft) / 60) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-serif font-medium text-white animate-auth-slide-down">
          Verify Your Code
        </h2>
        <p className="text-white/55 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] uppercase animate-auth-fade-delay-1">
          Enter the 6-digit code from your email
        </p>
        <div className="h-px w-10 bg-accent/70 mx-auto mt-3 animate-auth-fade-delay-2" />
      </div>

      {/* OTP input */}
      <div className="flex flex-col items-center gap-6 animate-auth-slide-up-2">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          className="gap-3"
        >
          <InputOTPGroup className="gap-2">
            <InputOTPSlot
              index={0}
              className="bg-white/8 border-white/20 text-white text-xl w-12 h-14 rounded-xl
                        data-[active=true]:border-accent data-[active=true]:ring-2 data-[active=true]:ring-accent/30
                        transition-all duration-200 font-serif"
            />
            <InputOTPSlot
              index={1}
              className="bg-white/8 border-white/20 text-white text-xl w-12 h-14 rounded-xl
                        data-[active=true]:border-accent data-[active=true]:ring-2 data-[active=true]:ring-accent/30
                        transition-all duration-200 font-serif"
            />
            <InputOTPSlot
              index={2}
              className="bg-white/8 border-white/20 text-white text-xl w-12 h-14 rounded-xl
                        data-[active=true]:border-accent data-[active=true]:ring-2 data-[active=true]:ring-accent/30
                        transition-all duration-200 font-serif"
            />
          </InputOTPGroup>
          <InputOTPSeparator className="text-white/30" />
          <InputOTPGroup className="gap-2">
            <InputOTPSlot
              index={3}
              className="bg-white/8 border-white/20 text-white text-xl w-12 h-14 rounded-xl
                        data-[active=true]:border-accent data-[active=true]:ring-2 data-[active=true]:ring-accent/30
                        transition-all duration-200 font-serif"
            />
            <InputOTPSlot
              index={4}
              className="bg-white/8 border-white/20 text-white text-xl w-12 h-14 rounded-xl
                        data-[active=true]:border-accent data-[active=true]:ring-2 data-[active=true]:ring-accent/30
                        transition-all duration-200 font-serif"
            />
            <InputOTPSlot
              index={5}
              className="bg-white/8 border-white/20 text-white text-xl w-12 h-14 rounded-xl
                        data-[active=true]:border-accent data-[active=true]:ring-2 data-[active=true]:ring-accent/30
                        transition-all duration-200 font-serif"
            />
          </InputOTPGroup>
        </InputOTP>

        {/* Countdown timer */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs font-[family-name:var(--font-montserrat)]">
              Code expires in
            </span>
            <span
              className={`text-xs font-[family-name:var(--font-montserrat)] font-semibold transition-colors duration-300 ${
                timeLeft <= 15 ? "text-red-400" : "text-accent"
              }`}
            >
              {timeLeft > 0 ? `0:${timeLeft.toString().padStart(2, "0")}` : "Expired"}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${100 - progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Verify button */}
      <Button
        onClick={handleVerify}
        disabled={otp.length !== 6 || isLoading}
        className="w-full bg-accent hover:bg-accent/90 text-white font-[family-name:var(--font-montserrat)]
                 uppercase tracking-[0.15em] text-xs h-12 group relative overflow-hidden
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
              Verifying...
            </>
          ) : (
            <>
              Verify & Continue
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </>
          )}
        </span>
      </Button>

      {/* Resend */}
      <div className="text-center space-y-3 animate-auth-fade-delay-4">
        <p className="text-white/50 text-sm font-[family-name:var(--font-montserrat)]">
          Didn&apos;t receive the code?{" "}
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-accent hover:text-accent/80 font-semibold transition-all duration-300 hover:underline underline-offset-4"
            >
              Resend
            </button>
          ) : (
            <span className="text-white/30">Resend in {timeLeft}s</span>
          )}
        </p>

        <div className="pt-4 border-t border-white/10">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-[family-name:var(--font-montserrat)] transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Change Email
          </Link>
        </div>
      </div>
    </div>
  );
}
