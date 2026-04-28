"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        <Image
          src="/images/hero-resort.jpg"
          alt="Serenity Bay Resort"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-white/90 mb-4 sm:mb-6 animate-fade-up">
          Welcome to Paradise
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-5 sm:mb-6 animate-fade-up animation-delay-200 text-balance max-w-5xl">
          Where Serenity Meets the Sea
        </h1>
        <p className="font-[family-name:var(--font-montserrat)] text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mb-8 sm:mb-10 animate-fade-up animation-delay-300 leading-relaxed">
          Discover unparalleled luxury in our award-winning tropical paradise. 
          Pristine beaches, world-class dining, and unforgettable experiences await.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto animate-fade-up animation-delay-400">
          <Link
            href="/rooms"
            className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-8 sm:px-10 py-4 bg-white text-primary hover:bg-white/90 transition-all duration-300 text-center"
          >
            Explore Rooms
          </Link>
          <Link
            href="/contact"
            className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-8 sm:px-10 py-4 border-2 border-white text-white hover:bg-white/10 transition-all duration-300 text-center"
          >
            Book Your Stay
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="text-white/80 w-8 h-8" />
      </div>
    </section>
  );
}
