import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication | Serenity Bay Resort",
  description: "Secure access to your Serenity Bay account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with layered overlays for depth */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-resort.jpg"
          alt="Serenity Bay Resort"
          fill
          className="object-cover scale-105 animate-subtle-zoom"
          priority
        />
        {/* Layered gradient overlays for premium look */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Subtle animated glow */}
        <div className="absolute inset-0 bg-accent/5 animate-pulse-slow" />
      </div>

      {/* Decorative floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float-delay pointer-events-none" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header above card */}
        <div className="text-center mb-6 animate-auth-slide-down">
          <Link
            href="/"
            className="inline-block group"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-wide group-hover:text-accent transition-colors duration-500">
              Serenity Bay
            </h1>
            <div className="h-px w-0 group-hover:w-full bg-accent mx-auto mt-1 transition-all duration-700 ease-out" />
          </Link>
          <p className="font-[family-name:var(--font-montserrat)] text-white/50 text-xs tracking-[0.3em] uppercase mt-2 animate-auth-fade-delay-2">
            Luxury Resort & Spa
          </p>
        </div>

        {/* Glassmorphism card */}
        <div className="bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.4)] overflow-hidden animate-auth-scale-in">
          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <div className="px-8 py-10">
            {children}
          </div>

          {/* Bottom accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center animate-auth-fade-delay-5">
          <p className="text-white/40 text-xs font-[family-name:var(--font-montserrat)] tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Serenity Bay Resort. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
