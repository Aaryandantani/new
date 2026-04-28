"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "",
    message: "",
    invitedEmails: "",
  });
  const router = useRouter();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateString = minDate.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const emailsArray = formData.invitedEmails
      .split(",")
      .map(email => email.trim())
      .filter(email => email !== "" && /^\S+@\S+\.\S+$/.test(email));

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, invitedEmails: emailsArray }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormSubmitted(true);
        toast.success("Reservation request submitted!");
      } else if (data.error === "Card required") {
        toast.error("Payment Method Required", {
          description: data.message,
          action: { label: "Add Card", onClick: () => router.push("/profile?tab=cards") },
          duration: 6000,
        });
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to submit reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[50vh] min-h-[350px] overflow-hidden">
        <Image src="/images/hero-resort.jpg" alt="Contact Us" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-white/90 mb-3 sm:mb-4 animate-fade-up">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white animate-fade-up animation-delay-200">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-10 sm:py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: <MapPin className="w-5 h-5 text-accent flex-shrink-0" />, title: "Location", lines: ["Serenity Bay Island", "Maldives, Indian Ocean"] },
              { icon: <Phone className="w-5 h-5 text-accent flex-shrink-0" />, title: "Phone", lines: ["+960 123 4567", "+960 765 4321"] },
              { icon: <Mail className="w-5 h-5 text-accent flex-shrink-0" />, title: "Email", lines: ["reservations@serenitybay.com", "info@serenitybay.com"] },
              { icon: <Clock className="w-5 h-5 text-accent flex-shrink-0" />, title: "Reservations", lines: ["24/7 Available", "Response within 24h"] },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <h3 className="font-[family-name:var(--font-montserrat)] font-semibold text-foreground mb-1 text-sm sm:text-base">{item.title}</h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm text-muted-foreground">
                      {item.lines[0]}<br />{item.lines[1]}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <ScrollReveal direction="left">
              <div>
                <span className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                  Book Your Stay
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 sm:mb-6 text-balance">
                  Make a Reservation
                </h2>
                <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Fill out the form below and our reservations team will get back to you 
                  within 24 hours with availability and a personalized quote.
                </p>

                {formSubmitted ? (
                  <div className="bg-secondary p-6 sm:p-8 text-center animate-scale-in">
                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-accent mx-auto mb-4" />
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground mb-2">Thank You!</h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground text-sm">
                      Your reservation request has been received. Our team will contact you shortly.
                    </p>
                    <button onClick={() => setFormSubmitted(false)} className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-accent mt-4 hover:underline">
                      Make another reservation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Full Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="John Smith" />
                      </div>
                      <div>
                        <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Email Address *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="+1 234 567 8900" />
                      </div>
                      <div>
                        <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Number of Guests</label>
                        <select name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5+">5+ Guests</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Check-in Date *</label>
                        <input type="date" name="checkIn" required min={minDateString} value={formData.checkIn} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Check-out Date *</label>
                        <input type="date" name="checkOut" required min={formData.checkIn || minDateString} value={formData.checkOut} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Room Preference</label>
                      <select name="roomType" value={formData.roomType} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                        <option value="">Select a room type</option>
                        <option value="ocean-suite">Ocean View Suite</option>
                        <option value="overwater-villa">Overwater Villa</option>
                        <option value="garden-suite">Garden Suite</option>
                        <option value="presidential">Presidential Beach Villa</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Invite Friends (comma separated emails)</label>
                      <input type="text" name="invitedEmails" value={formData.invitedEmails} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="friend1@example.com, friend2@example.com" />
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-foreground block mb-2">Special Requests</label>
                      <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-secondary border-0 px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="Any special requests or celebrations we should know about?" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? "Processing..." : "Submit Reservation Request"}
                      {!isSubmitting && <Send size={16} />}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Image & Info */}
            <ScrollReveal direction="right" delay={200}>
              <div className="space-y-6 sm:space-y-8">
                <div className="aspect-[4/3] relative overflow-hidden image-zoom">
                  <Image src="/images/pool.jpg" alt="Resort Pool" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="bg-secondary p-6 sm:p-8">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground mb-3 sm:mb-4">Getting Here</h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground leading-relaxed mb-4 text-sm">
                    Serenity Bay is located in the Maldives, accessible via seaplane or 
                    speedboat transfer from Male International Airport. Our team will 
                    coordinate all transfers upon booking confirmation.
                  </p>
                  <ul className="space-y-2 font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
                    {["45-minute seaplane transfer", "90-minute speedboat transfer", "VIP airport lounge access included"].map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
