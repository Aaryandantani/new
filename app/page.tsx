import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { RoomsPreview } from "@/components/home/rooms-preview";
import { AmenitiesPreview } from "@/components/home/amenities-preview";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <RoomsPreview />
      <AmenitiesPreview />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
