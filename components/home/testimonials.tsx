"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/villa-pool.jpg"
          alt="Resort View"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-primary-foreground/30 mx-auto mb-6 sm:mb-8" />
            
            {/* Testimonial Content */}
            <div className="relative min-h-[280px] sm:min-h-[250px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-700",
                    index === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  )}
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary-foreground leading-relaxed mb-6 sm:mb-8 italic text-balance">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div>
                    <p className="font-[family-name:var(--font-montserrat)] font-medium text-primary-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-[family-name:var(--font-montserrat)] text-sm text-primary-foreground/70">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prevSlide}
                className="p-3 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "bg-primary-foreground w-8"
                        : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-3 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
