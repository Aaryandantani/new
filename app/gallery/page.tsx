"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { galleryImages } from "@/lib/data";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "all" | "resort" | "rooms" | "wellness" | "dining";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };
  const prevImage = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[50vh] min-h-[350px] overflow-hidden">
        <Image src="/images/beach.jpg" alt="Resort Gallery" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-white/90 mb-3 sm:mb-4 animate-fade-up">
            Visual Journey
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white animate-fade-up animation-delay-200">
            Gallery
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sm:py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {(["all", "resort", "rooms", "wellness", "dining"] as Category[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "font-[family-name:var(--font-montserrat)] text-xs sm:text-sm font-medium tracking-wider uppercase px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {filteredImages.map((image, index) => (
              <ScrollReveal key={image.id} delay={(index % 8) * 50}>
                <button
                  onClick={() => openLightbox(index)}
                  className="aspect-square relative overflow-hidden group cursor-pointer w-full"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-wider uppercase">
                      View
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in" onClick={closeLightbox}>
          {/* Close */}
          <button onClick={closeLightbox} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white transition-colors z-10 p-2" aria-label="Close lightbox">
            <X size={28} />
          </button>

          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2 z-10" aria-label="Previous image">
            <ChevronLeft size={32} className="sm:w-10 sm:h-10" />
          </button>

          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2 z-10" aria-label="Next image">
            <ChevronRight size={32} className="sm:w-10 sm:h-10" />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl aspect-[4/3] mx-12 sm:mx-16" onClick={(e) => e.stopPropagation()}>
            <Image src={filteredImages[lightboxIndex].src} alt={filteredImages[lightboxIndex].alt} fill className="object-contain" sizes="100vw" />
          </div>

          {/* Caption */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
            <p className="font-[family-name:var(--font-montserrat)] text-white text-xs sm:text-sm">{filteredImages[lightboxIndex].alt}</p>
            <p className="font-[family-name:var(--font-montserrat)] text-white/60 text-xs mt-1">{lightboxIndex + 1} / {filteredImages.length}</p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
