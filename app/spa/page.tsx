import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { spaServices } from "@/lib/data";
import { Clock, ArrowRight, Sparkles, Flower2, Wind, Moon, Heart } from "lucide-react";

const wellnessFacilities = [
  {
    name: "Yoga Pavilion",
    description: "Open-air pavilion overlooking the ocean for morning sun salutations and evening meditation.",
    icon: <Wind className="w-7 h-7" />,
    image: "/images/yoga.jpg"
  },
  {
    name: "Hydrotherapy Pool",
    description: "Temperature-controlled mineral pools with therapeutic massage jets to relieve tension.",
    icon: <Sparkles className="w-7 h-7" />,
    image: "/images/pool.jpg"
  },
  {
    name: "Steam & Sauna",
    description: "Traditional Himalayan salt sauna and eucalyptus-infused steam rooms for detoxification.",
    icon: <Moon className="w-7 h-7" />,
    image: "/images/spa.jpg"
  }
];

export default function SpaPage() {
  return (
    <main>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/spa.jpg"
          alt="Spa & Wellness"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <ScrollReveal>
            <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/90 mb-4 sm:mb-6 block">
              The Art of Rejuvenation
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-5 sm:mb-8 text-balance">
              Serenity Spa & Wellness
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-white/90 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Enter a sanctuary where time stands still. Our holistic approach combines 
              ancient wisdom with modern luxury to restore your inner balance.
            </p>
          </ScrollReveal>
        </div>
        <div className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/80 to-transparent" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <div className="space-y-6 sm:space-y-8">
                <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-accent font-semibold">
                  Our Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground leading-tight">
                  A Journey to Your Most Radiant Self
                </h2>
                <p className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg text-muted-foreground leading-relaxed">
                  At Serenity Bay, wellness is more than just a treatment—it's a way of being. 
                  We believe in the healing power of nature and the importance of mindful relaxation. 
                  Our expert therapists use organic, locally-sourced ingredients to create 
                  transformative experiences tailored to your unique needs.
                </p>
                <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
                  <div className="space-y-3">
                    <Flower2 className="text-accent w-6 h-6" />
                    <h4 className="font-serif text-lg sm:text-xl font-medium">Natural Elements</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      Marine extracts and botanical oils.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Heart className="text-accent w-6 h-6" />
                    <h4 className="font-serif text-lg sm:text-xl font-medium">Holistic Healing</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      Balancing mind, body, and spirit.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="relative aspect-[4/3] lg:aspect-square mt-8 lg:mt-0">
                <div className="absolute inset-4 border border-accent/20 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4" />
                <Image
                  src="/images/yoga.jpg"
                  alt="Wellness Philosophy"
                  fill
                  className="object-cover shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wellness Facilities */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
              <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                Sanctuary Facilities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 sm:mb-6">
                Designed for Serenity
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {wellnessFacilities.map((facility, index) => (
              <ScrollReveal key={facility.name} delay={index * 150}>
                <div className="group bg-card overflow-hidden hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 sm:p-8 space-y-3 sm:space-y-4">
                    <div className="text-accent">{facility.icon}</div>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium">{facility.name}</h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spa Menu Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16 border-b border-border pb-8 md:pb-12">
              <div className="max-w-2xl">
                <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-accent font-semibold mb-3 sm:mb-4 block">
                  The Menu
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
                  Signature Treatments
                </h2>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm max-w-sm">
                Each treatment is a ritual designed to transport you to a state of profound relaxation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {spaServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between p-5 sm:p-7 lg:p-8 border border-border/50 hover:border-accent/30 hover:bg-secondary/20 transition-all group gap-3">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1 text-muted-foreground text-xs uppercase tracking-widest font-[family-name:var(--font-montserrat)]">
                        <Clock size={13} />
                        <span>{service.duration}</span>
                      </div>
                      <span className="text-accent/30">•</span>
                      <span className="text-muted-foreground text-xs uppercase tracking-widest font-[family-name:var(--font-montserrat)]">
                        Therapeutic
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="sm:text-right sm:pl-4 shrink-0">
                    <span className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
                      ${service.price}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="mt-12 md:mt-20 text-center bg-secondary/30 p-8 sm:p-12 backdrop-blur-sm">
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-4 sm:mb-6">Experience Ultimate Bliss</h3>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Advanced reservations are recommended to ensure your preferred time and therapist.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-8 sm:px-12 py-4 sm:py-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl"
              >
                Schedule Your Visit
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
