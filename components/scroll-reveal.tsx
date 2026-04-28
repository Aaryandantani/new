"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export function ScrollReveal({ 
  children, 
  className, 
  delay = 0,
  direction = "up" 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active");
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getDirectionStyles = () => {
    switch (direction) {
      case "left":
        return "translate-x-[-50px]";
      case "right":
        return "translate-x-[50px]";
      case "scale":
        return "scale-95";
      default:
        return "translate-y-[30px]";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 transition-all duration-700 ease-out",
        getDirectionStyles(),
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <style jsx>{`
        div.active {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
      `}</style>
      {children}
    </div>
  );
}
