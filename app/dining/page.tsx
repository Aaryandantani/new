import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { dining } from "@/lib/data";
import { Clock, Shirt, ArrowRight, Wine, UtensilsCrossed, Coffee } from "lucide-react";

const highlights = [
  {
    title: "Farm to Table",
    description: "Fresh, locally-sourced ingredients from our organic garden and local fishermen",
    icon: <UtensilsCrossed className="w-7 h-7" />,
  },
  {
    title: "Wine Cellar",
    description: "Over 500 labels from renowned vineyards around the world",
    icon: <Wine className="w-7 h-7" />,
  },
  {
    title: "In-Villa Dining",
    description: "Private dining experiences in the comfort of your accommodation",
    icon: <Coffee className="w-7 h-7" />,
  },
];

export default function DiningPage() {
  return (
    <main>
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image src="/images/dining.jpg" alt="Fine Dining" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-white/90 mb-3 sm:mb-4 animate-fade-up">
            Culinary Excellence
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white animate-fade-up animation-delay-200 text-balance">
            Dining &amp; Drinks
          </h1>
          <p className="font-[family-name:var(--font-montserrat)] text-white/90 max-w-xl mt-4 sm:mt-6 animate-fade-up animation-delay-300 leading-relaxed text-sm sm:text-base">
            Embark on a gastronomic journey through our collection of restaurants and bars.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 sm:py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {highlights.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100}>
                <div className="flex items-start gap-4">
                  <div className="text-accent flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-2">{item.title}</h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                Our Venues
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 sm:mb-6 text-balance">
                Restaurants &amp; Bars
              </h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed text-sm sm:text-base">
                From sophisticated fine dining to casual beachside fare, our culinary 
                team creates exceptional experiences for every palate.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12 sm:space-y-16">
            {dining.map((restaurant, index) => (
              <ScrollReveal key={restaurant.id} delay={index * 100}>
                <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="aspect-[3/2] relative overflow-hidden image-zoom">
                      <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.2em] uppercase text-accent">
                        {restaurant.cuisine}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mt-2">
                        {restaurant.name}
                      </h3>
                    </div>
                    <p className="font-[family-name:var(--font-montserrat)] text-sm sm:text-lg text-muted-foreground leading-relaxed">
                      {restaurant.description}
                    </p>
                    <div className="flex flex-wrap gap-4 sm:gap-6 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        <span className="font-[family-name:var(--font-montserrat)] text-sm">{restaurant.hours}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Shirt size={16} />
                        <span className="font-[family-name:var(--font-montserrat)] text-sm">{restaurant.dress}</span>
                      </span>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-xs sm:text-sm font-medium tracking-wider uppercase px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Reserve a Table
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Private Dining */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/bar.jpg" alt="Private Dining" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-primary-foreground/80 mb-4 block">
                Special Occasions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-primary-foreground mb-4 sm:mb-6 text-balance">
                Private Dining Experiences
              </h2>
              <p className="font-[family-name:var(--font-montserrat)] text-primary-foreground/90 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
                Create unforgettable moments with our bespoke private dining options. 
                From romantic beach dinners under the stars to exclusive chef&apos;s table 
                experiences, our team will craft the perfect setting for your celebration.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 font-[family-name:var(--font-montserrat)] text-xs sm:text-sm font-medium tracking-wider uppercase px-8 sm:px-10 py-4 bg-white text-primary hover:bg-white/90 transition-colors"
              >
                Plan Your Event
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* In-Room Dining */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] lg:aspect-square relative overflow-hidden image-zoom">
                <Image src="/images/villa-pool.jpg" alt="In-Room Dining" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200}>
              <div className="space-y-4 sm:space-y-6">
                <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground">
                  24-Hour Service
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground text-balance">
                  In-Villa Dining
                </h2>
                <p className="font-[family-name:var(--font-montserrat)] text-sm sm:text-lg text-muted-foreground leading-relaxed">
                  Enjoy the full resort dining experience from the privacy of your 
                  accommodation. Our in-villa dining menu features a curated selection 
                  of dishes from all our restaurants, available around the clock.
                </p>
                <ul className="space-y-3">
                  {["24-hour room service", "Private chef experiences", "Romantic dinner setups", "Breakfast in bed"].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
