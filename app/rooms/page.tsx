"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { rooms } from "@/lib/data";
import { Users, Maximize, Check, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "all" | "suite" | "villa";

export default function RoomsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);

  const filteredRooms = activeCategory === "all" 
    ? rooms 
    : rooms.filter(room => room.category === activeCategory);

  return (
    <main>
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image src="/images/suite-ocean.jpg" alt="Luxury Suite" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-white/90 mb-3 sm:mb-4 animate-fade-up">
            Accommodations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white animate-fade-up animation-delay-200 text-balance">
            Rooms &amp; Suites
          </h1>
          <p className="font-[family-name:var(--font-montserrat)] text-white/90 max-w-xl mt-4 sm:mt-6 animate-fade-up animation-delay-300 leading-relaxed text-sm sm:text-base">
            Each accommodation is a sanctuary of comfort and elegance, designed to make your stay unforgettable.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sm:py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {(["all", "suite", "villa"] as Category[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "font-[family-name:var(--font-montserrat)] text-xs sm:text-sm font-medium tracking-wider uppercase px-5 sm:px-8 py-2.5 sm:py-3 transition-all duration-300",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {category === "all" ? "All Rooms" : category === "suite" ? "Suites" : "Villas"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {filteredRooms.map((room, index) => (
              <ScrollReveal key={room.id} delay={index * 100}>
                <div className="group cursor-pointer" onClick={() => setSelectedRoom(room)}>
                  <div className="aspect-[4/3] relative overflow-hidden mb-4 sm:mb-6">
                    <Image src={room.image} alt={room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2">
                      <span className="font-serif text-lg sm:text-xl font-medium text-foreground">${room.price}</span>
                      <span className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground">/night</span>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground group-hover:text-accent transition-colors">{room.name}</h2>
                        <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mt-1">{room.size}</p>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                        <Users size={15} />
                        <span className="font-[family-name:var(--font-montserrat)] text-sm">{room.maxGuests}</span>
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground leading-relaxed">{room.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {room.features.slice(0, 4).map((feature) => (
                        <span key={feature} className="font-[family-name:var(--font-montserrat)] text-xs tracking-wide uppercase bg-secondary px-2.5 py-1.5 text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm font-medium text-accent group-hover:gap-3 transition-all">
                      View Details <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Room Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-4 animate-fade-in" onClick={() => setSelectedRoom(null)}>
          <div className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video">
              <Image src={selectedRoom.image} alt={selectedRoom.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
              <button onClick={() => setSelectedRoom(null)} className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 hover:bg-white transition-colors" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-4xl font-medium text-foreground">{selectedRoom.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><Maximize size={15} /><span className="font-[family-name:var(--font-montserrat)] text-sm">{selectedRoom.size}</span></span>
                    <span className="flex items-center gap-1"><Users size={15} /><span className="font-[family-name:var(--font-montserrat)] text-sm">Up to {selectedRoom.maxGuests} guests</span></span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-foreground">${selectedRoom.price}</span>
                  <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm text-muted-foreground block">per night</span>
                </div>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed text-sm sm:text-lg">{selectedRoom.description}</p>
              <div>
                <h3 className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm font-semibold tracking-wider uppercase text-foreground mb-3 sm:mb-4">Room Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {selectedRoom.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
                      <Check size={15} className="text-accent shrink-0" />{feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/contact" className="flex-1 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase text-center py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Book This Room
                </Link>
                <button onClick={() => setSelectedRoom(null)} className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-6 sm:px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
