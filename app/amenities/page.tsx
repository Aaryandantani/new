import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { amenities, spaServices } from "@/lib/data";
import { Clock, ArrowRight, Sparkles, Waves, Umbrella, Heart, Dumbbell, Sailboat } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  spa: <Sparkles className="w-10 h-10" />,
  pool: <Waves className="w-10 h-10" />,
  beach: <Umbrella className="w-10 h-10" />,
  yoga: <Heart className="w-10 h-10" />,
};

const additionalAmenities = [
  {
    name: "Fitness Center",
    description: "State-of-the-art equipment with personal trainers available",
    icon: <Dumbbell className="w-8 h-8" />,
  },
  {
    name: "Water Sports",
    description: "Kayaking, snorkeling, diving, and paddleboarding",
    icon: <Sailboat className="w-8 h-8" />,
  },
  {
    name: "Tennis Courts",
    description: "Professionally maintained courts with coaching",
    icon: <Waves className="w-8 h-8" />,
  },
  {
    name: "Kids Club",
    description: "Supervised activities for children ages 4-12",
    icon: <Heart className="w-8 h-8" />,
  },
];

export default function AmenitiesPage() {
  return (
    <main>
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/spa.jpg"
          alt="Spa & Wellness"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-white/90 mb-4 animate-fade-up">
            Wellness & Recreation
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-white animate-fade-up animation-delay-200 text-balance">
            Amenities & Spa
          </h1>
          <p className="font-[family-name:var(--font-montserrat)] text-white/90 max-w-2xl mt-6 animate-fade-up animation-delay-300 leading-relaxed">
            Discover a world of relaxation and rejuvenation with our comprehensive wellness offerings.
          </p>
        </div>
      </section>

      {/* Main Amenities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                Facilities
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6 text-balance">
                World-Class Amenities
              </h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed">
                From our award-winning spa to pristine beaches, every amenity is designed 
                to enhance your experience and create lasting memories.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-24">
            {amenities.map((amenity, index) => (
              <ScrollReveal key={amenity.id} delay={index * 100}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="aspect-[4/3] relative overflow-hidden image-zoom">
                      <Image
                        src={amenity.image}
                        alt={amenity.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="text-accent">
                      {iconMap[amenity.icon]}
                    </div>
                    <h3 className="font-serif text-4xl font-medium text-foreground">
                      {amenity.name}
                    </h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-lg text-muted-foreground leading-relaxed">
                      {amenity.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm font-medium text-accent hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spa Services */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                Serenity Spa
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6 text-balance">
                Signature Treatments
              </h2>
              <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed">
                Indulge in our curated selection of treatments designed to restore 
                balance and rejuvenate your body and mind.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {spaServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100}>
                <div className="bg-card p-8 hover:shadow-lg transition-shadow duration-500 group">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-serif text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                    <span className="font-serif text-2xl font-medium text-foreground">
                      ${service.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Clock size={16} />
                    <span className="font-[family-name:var(--font-montserrat)] text-sm">
                      {service.duration}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book a Treatment
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Additional Amenities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                More to Explore
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6 text-balance">
                Activities & Recreation
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalAmenities.map((amenity, index) => (
              <ScrollReveal key={amenity.name} delay={index * 100}>
                <div className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-secondary flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-500">
                    {amenity.icon}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                    {amenity.name}
                  </h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
                    {amenity.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
