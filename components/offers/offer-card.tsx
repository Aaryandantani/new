"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface OfferCardProps {
  offer: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    discount: string;
    validity: string;
    inclusions: string[];
  };
  index: number;
}

export function OfferCard({ offer, index }: OfferCardProps) {
  return (
    <ScrollReveal delay={index * 150}>
      <div className="group bg-card overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[280px] lg:min-h-0 overflow-hidden">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="bg-accent text-accent-foreground font-[family-name:var(--font-montserrat)] text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg">
                {offer.discount}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <span className="font-[family-name:var(--font-montserrat)] text-[10px] sm:text-xs tracking-[0.3em] uppercase text-accent mb-2 block font-semibold">
                  {offer.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                  {offer.title}
                </h3>
              </div>

              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed text-sm sm:text-base">
                {offer.description}
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {offer.inclusions.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-foreground/80">
                    <CheckCircle2 size={14} className="text-accent shrink-0" />
                    <span className="text-xs sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground border-t border-border/40 pt-4">
                <Calendar size={14} className="text-accent shrink-0" />
                <span className="font-[family-name:var(--font-montserrat)] text-[10px] sm:text-xs uppercase tracking-wider">
                  {offer.validity}
                </span>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 sm:gap-3 font-[family-name:var(--font-montserrat)] text-xs sm:text-sm font-medium tracking-wider uppercase px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Book This Offer
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

