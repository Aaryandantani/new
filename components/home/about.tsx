"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";

export function About() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight text-balance">
                A Sanctuary of Timeless Elegance
              </h2>
              <div className="space-y-4 font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed">
                <p>
                  Nestled on a private island in the heart of the Indian Ocean, Serenity Bay 
                  Resort has been welcoming discerning travelers since 2008. Our philosophy 
                  is simple: create moments of pure bliss in harmony with nature.
                </p>
                <p>
                  Every aspect of your stay has been thoughtfully curated, from the 
                  architecture that embraces the landscape to the personalized service 
                  that anticipates your every desire. Here, luxury is not ostentatious 
                  but effortless.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-border">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-medium text-primary">15+</span>
                  <p className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm text-muted-foreground mt-1">
                    Years of Excellence
                  </p>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-medium text-primary">48</span>
                  <p className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm text-muted-foreground mt-1">
                    Luxury Villas
                  </p>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-medium text-primary">5</span>
                  <p className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm text-muted-foreground mt-1">
                    Star Rating
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Image Grid */}
          <ScrollReveal direction="right" delay={200}>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] relative overflow-hidden image-zoom">
                  <Image
                    src="/images/spa.jpg"
                    alt="Spa Experience"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden image-zoom">
                  <Image
                    src="/images/dining.jpg"
                    alt="Fine Dining"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square relative overflow-hidden image-zoom">
                  <Image
                    src="/images/pool.jpg"
                    alt="Infinity Pool"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="aspect-[3/4] relative overflow-hidden image-zoom">
                  <Image
                    src="/images/beach.jpg"
                    alt="Private Beach"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
