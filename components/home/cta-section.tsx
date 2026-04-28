"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Ready to Escape?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4 sm:mb-6 text-balance">
              Begin Your Journey to Paradise
            </h2>
            <p className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Let us craft your perfect getaway. Contact our reservations team 
              for personalized recommendations and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-8 sm:px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
              >
                Make a Reservation
              </Link>
              <Link
                href="/rooms"
                className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-8 sm:px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-center"
              >
                Explore Rooms
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
