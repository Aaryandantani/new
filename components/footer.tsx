import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Serenity Bay</h3>
            <p className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm leading-relaxed opacity-80">
              Where tranquility meets luxury. Experience paradise at our award-winning
              resort nestled in the heart of the tropics.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Facebook">
                <Facebook size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold tracking-wider uppercase mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {["Rooms & Suites", "Dining", "Spa & Wellness", "Gallery", "Special Offers"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="font-[family-name:var(--font-montserrat)] text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold tracking-wider uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 opacity-80" />
                <span className="font-[family-name:var(--font-montserrat)] text-sm opacity-80">
                  Serenity Bay Island<br />
                  Maldives, Indian Ocean
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="opacity-80" />
                <span className="font-[family-name:var(--font-montserrat)] text-sm opacity-80">
                  +960 123 4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="opacity-80" />
                <span className="font-[family-name:var(--font-montserrat)] text-sm opacity-80">
                  reservations@serenitybay.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold tracking-wider uppercase mb-6">
              Newsletter
            </h4>
            <p className="font-[family-name:var(--font-montserrat)] text-sm opacity-80 mb-4">
              Subscribe for exclusive offers and island updates.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-primary px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="font-[family-name:var(--font-montserrat)] text-xs opacity-60">
            &copy; {new Date().getFullYear()} Serenity Bay Resort. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="font-[family-name:var(--font-montserrat)] text-xs opacity-60 hover:opacity-80 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#" className="font-[family-name:var(--font-montserrat)] text-xs opacity-60 hover:opacity-80 transition-opacity">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
