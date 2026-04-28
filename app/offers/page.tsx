import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { specialOffers } from "@/lib/data";
import { OfferCard } from "@/components/offers/offer-card";
import { Sparkles, Gift, Clock, ShieldCheck } from "lucide-react";

export default function OffersPage() {
  return (
    <main>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/hero-resort.jpg"
          alt="Special Offers"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <ScrollReveal>
            <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/90 mb-4 sm:mb-6 block">
              Exclusive Packages
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium text-white mb-5 sm:mb-8">
              Exceptional Offers
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-white/90 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Enhance your stay at Serenity Bay with our curated collection of 
              special packages and exclusive benefits.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 text-center">
              <ScrollReveal delay={100}>
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary flex items-center justify-center text-accent mx-auto">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium">Best Rate Guarantee</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Always find the lowest rates when you book directly with us.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary flex items-center justify-center text-accent mx-auto">
                    <Gift size={24} />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium">Exclusive Perks</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Enjoy additional benefits and personalized surprises.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary flex items-center justify-center text-accent mx-auto">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium">Peace of Mind</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Flexible cancellation policies for worry-free planning.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Offers List */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-10 sm:space-y-16">
            {specialOffers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock size={20} className="text-accent" />
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">Terms & Conditions</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-sm text-muted-foreground font-[family-name:var(--font-montserrat)] leading-relaxed">
                <ul className="space-y-3 sm:space-y-4 list-disc pl-5">
                  <li>All offers are subject to availability at the time of booking.</li>
                  <li>Blackout dates and other restrictions may apply.</li>
                  <li>Offers are not valid in conjunction with any other promotion.</li>
                </ul>
                <ul className="space-y-3 sm:space-y-4 list-disc pl-5">
                  <li>Rates are per night and vary by arrival date and duration of stay.</li>
                  <li>Package components are non-transferable and non-refundable.</li>
                  <li>Serenity Bay Resort reserves the right to modify offers without notice.</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

