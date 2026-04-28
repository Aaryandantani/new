// Resort static data

export const rooms = [
  {
    id: 1,
    name: "Ocean View Suite",
    description: "Wake up to breathtaking ocean views in our elegantly appointed suites featuring private balconies, premium amenities, and the gentle sound of waves.",
    price: 450,
    size: "65 sqm",
    maxGuests: 2,
    image: "/images/suite-ocean.jpg",
    features: ["Ocean View", "King Bed", "Private Balcony", "Rain Shower", "Mini Bar"],
    category: "suite"
  },
  {
    id: 2,
    name: "Overwater Villa",
    description: "Experience the ultimate luxury in our iconic overwater villas with glass floor panels, private infinity pool, and direct ocean access.",
    price: 850,
    size: "120 sqm",
    maxGuests: 2,
    image: "/images/villa-pool.jpg",
    features: ["Private Pool", "Glass Floor", "Butler Service", "Outdoor Shower", "Sunset View"],
    category: "villa"
  },
  {
    id: 3,
    name: "Garden Suite",
    description: "Nestled amidst tropical gardens, these peaceful retreats offer serenity and natural beauty with modern comforts.",
    price: 350,
    size: "55 sqm",
    maxGuests: 2,
    image: "/images/garden-suite.jpg",
    features: ["Garden View", "Outdoor Terrace", "Soaking Tub", "Espresso Machine", "Yoga Mat"],
    category: "suite"
  },
  {
    id: 4,
    name: "Presidential Beach Villa",
    description: "Our most exclusive accommodation featuring two bedrooms, private beach access, dedicated chef, and uncompromising luxury.",
    price: 1500,
    size: "250 sqm",
    maxGuests: 4,
    image: "/images/hero-resort.jpg",
    features: ["Private Beach", "Personal Chef", "2 Bedrooms", "Private Pool", "24/7 Butler"],
    category: "villa"
  }
];

export const amenities = [
  {
    id: 1,
    name: "Serenity Spa",
    description: "A sanctuary of wellness offering traditional and modern treatments using organic ingredients and ancient healing techniques.",
    image: "/images/spa.jpg",
    icon: "spa"
  },
  {
    id: 2,
    name: "Infinity Pool",
    description: "Our stunning infinity pool blends seamlessly with the ocean horizon, perfect for morning laps or sunset cocktails.",
    image: "/images/pool.jpg",
    icon: "pool"
  },
  {
    id: 3,
    name: "Private Beach",
    description: "Pristine white sand meets crystal-clear waters on our exclusive beach, with personalized service throughout the day.",
    image: "/images/beach.jpg",
    icon: "beach"
  },
  {
    id: 4,
    name: "Wellness Center",
    description: "Featuring yoga pavilions, meditation gardens, and fitness facilities with ocean views to inspire your practice.",
    image: "/images/yoga.jpg",
    icon: "yoga"
  }
];

export const dining = [
  {
    id: 1,
    name: "Azure",
    cuisine: "Fine Dining",
    description: "Our signature restaurant offers a sophisticated culinary journey featuring locally-sourced seafood and international flavors.",
    hours: "6:00 PM - 10:00 PM",
    dress: "Smart Elegant",
    image: "/images/dining.jpg"
  },
  {
    id: 2,
    name: "Sunset Bar",
    cuisine: "Cocktails & Tapas",
    description: "Craft cocktails and light bites served as the sun dips below the horizon in our iconic beachfront bar.",
    hours: "4:00 PM - 12:00 AM",
    dress: "Resort Casual",
    image: "/images/bar.jpg"
  },
  {
    id: 3,
    name: "Tides",
    cuisine: "All-Day Dining",
    description: "From sunrise breakfast to late-night cravings, Tides offers global cuisines in a relaxed oceanfront setting.",
    hours: "6:00 AM - 11:00 PM",
    dress: "Casual",
    image: "/images/pool.jpg"
  }
];

export const spaServices = [
  {
    id: 1,
    name: "Signature Serenity Journey",
    duration: "120 min",
    price: 350,
    description: "A complete wellness experience combining traditional massage, aromatherapy, and tropical body treatment."
  },
  {
    id: 2,
    name: "Ocean Bliss Massage",
    duration: "90 min",
    price: 220,
    description: "Deep tissue massage using warm coconut oil and the sound of ocean waves for ultimate relaxation."
  },
  {
    id: 3,
    name: "Tropical Glow Facial",
    duration: "60 min",
    price: 180,
    description: "Rejuvenating facial using local fruits and marine extracts to reveal radiant, youthful skin."
  },
  {
    id: 4,
    name: "Couples Retreat",
    duration: "150 min",
    price: 550,
    description: "Romantic experience for two featuring side-by-side treatments, champagne, and private relaxation time."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah & James",
    location: "New York, USA",
    text: "Our honeymoon at Serenity Bay was absolutely magical. The overwater villa exceeded all expectations, and the staff made us feel like royalty.",
    rating: 5
  },
  {
    id: 2,
    name: "Emma Thompson",
    location: "London, UK",
    text: "The spa treatments were transformative, and the dining experiences were world-class. Already planning our return visit.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    location: "Singapore",
    text: "Impeccable service, stunning views, and attention to every detail. This is what luxury hospitality should be.",
    rating: 5
  }
];

export const galleryImages = [
  { id: 1, src: "/images/hero-resort.jpg", alt: "Resort Overview", category: "resort" },
  { id: 2, src: "/images/suite-ocean.jpg", alt: "Ocean Suite", category: "rooms" },
  { id: 3, src: "/images/villa-pool.jpg", alt: "Overwater Villa", category: "rooms" },
  { id: 4, src: "/images/spa.jpg", alt: "Spa Treatment", category: "wellness" },
  { id: 5, src: "/images/dining.jpg", alt: "Fine Dining", category: "dining" },
  { id: 6, src: "/images/pool.jpg", alt: "Infinity Pool", category: "resort" },
  { id: 7, src: "/images/beach.jpg", alt: "Private Beach", category: "resort" },
  { id: 8, src: "/images/yoga.jpg", alt: "Yoga Pavilion", category: "wellness" },
  { id: 9, src: "/images/garden-suite.jpg", alt: "Garden Suite", category: "rooms" },
  { id: 10, src: "/images/bar.jpg", alt: "Sunset Bar", category: "dining" }
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/spa", label: "Spa & Wellness" },
  { href: "/dining", label: "Dining" },
  { href: "/offers", label: "Special Offers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

export const specialOffers = [
  {
    id: 1,
    title: "Romantic Escape",
    subtitle: "For the Ultimate Couple's Retreat",
    description: "Enjoy a 4-night stay in our Overwater Villa, inclusive of a private beach dinner, side-by-side spa treatments, and a sunset cruise.",
    image: "/images/villa-pool.jpg",
    discount: "20% OFF",
    validity: "Valid until Dec 2026",
    inclusions: ["4-Night Stay", "Beach Dinner", "Couple's Spa", "Sunset Cruise"]
  },
  {
    id: 2,
    title: "Early Bird Special",
    subtitle: "Plan Ahead and Save",
    description: "Book your tropical getaway 60 days in advance and receive exclusive rates along with complimentary daily breakfast and airport transfers.",
    image: "/images/suite-ocean.jpg",
    discount: "15% OFF",
    validity: "Limited Time Offer",
    inclusions: ["Exclusive Rates", "Daily Breakfast", "Airport Transfers", "Welcome Drink"]
  },
  {
    id: 3,
    title: "Wellness Sanctuary",
    subtitle: "Rejuvenate Your Mind & Body",
    description: "A 5-day immersive wellness program including daily yoga, personalized spa treatments, and nutritional consultations.",
    image: "/images/spa.jpg",
    discount: "COMPLIMENTARY SPA",
    validity: "Min 5 nights stay",
    inclusions: ["Daily Yoga", "Spa Treatments", "Nutrition Plan", "Meditation Class"]
  },
  {
    id: 4,
    title: "Family Adventure",
    subtitle: "Memories for All Ages",
    description: "Experience paradise with the whole family. Kids stay and eat for free, plus enjoy supervised island activities.",
    image: "/images/beach.jpg",
    discount: "KIDS FREE",
    validity: "Min 3 nights stay",
    inclusions: ["Kids Stay Free", "Kids Eat Free", "Kids Club Access", "Family Photo"]
  }
];
