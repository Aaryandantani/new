"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Waves, Umbrella, Heart } from "lucide-react";
import { amenities } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";

const iconMap: Record<string, React.ReactNode> = {
  spa: <Sparkles className="w-8 h-8" />,
  pool: <Waves className="w-8 h-8" />,
  beach: <Umbrella className="w-8 h-8" />,
  yoga: <Heart className="w-8 h-8" />,
};

export function AmenitiesPreview() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Experiences
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 text-balance">
              Resort Amenities
            </h2>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed">
              From rejuvenating spa treatments to pristine beaches, discover the 
              world-class amenities that make your stay unforgettable.
            </p>
          </div>
        </ScrollReveal>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {amenities.map((amenity, index) => (
            <ScrollReveal key={amenity.id} delay={index * 100}>
              <Link href="/amenities" className="group block">
                <div className="relative h-[400px] overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="text-white/80 mb-4 transform group-hover:scale-110 transition-transform duration-500">
                      {iconMap[amenity.icon]}
                    </div>
                    <h3 className="font-serif text-3xl font-medium text-white mb-2 group-hover:text-accent transition-colors">
                      {amenity.name}
                    </h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-sm text-white/80 max-w-md leading-relaxed">
                      {amenity.description}
                    </p>
                    <span className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm font-medium text-white mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Explore
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={500}>
          <div className="text-center mt-12">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-3 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              View All Amenities
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
