"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { rooms } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RoomsPreview() {
  const featuredRooms = rooms.slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Accommodations
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 text-balance">
              Rooms & Suites
            </h2>
            <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed">
              Each of our thoughtfully designed accommodations offers a private retreat 
              where modern luxury meets natural beauty.
            </p>
          </div>
        </ScrollReveal>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <ScrollReveal key={room.id} delay={index * 150}>
              <Link href="/rooms" className="group block">
                <div className="bg-card overflow-hidden transition-all duration-500 hover:shadow-xl">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                          {room.name}
                        </h3>
                        <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mt-1">
                          {room.size}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users size={16} />
                        <span className="font-[family-name:var(--font-montserrat)] text-sm">
                          {room.maxGuests}
                        </span>
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-serif text-2xl font-medium text-foreground">
                        ${room.price}
                        <span className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground font-normal">
                          /night
                        </span>
                      </span>
                      <span className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Details
                        <ArrowRight size={16} />
                      </span>
                    </div>
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
              href="/rooms"
              className="inline-flex items-center gap-3 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase text-foreground hover:text-accent transition-colors"
            >
              View All Accommodations
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
