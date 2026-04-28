"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();

    // Listen for profile updates from other components
    window.addEventListener("profileUpdated", fetchUser);
    return () => window.removeEventListener("profileUpdated", fetchUser);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
        toast.success("Logged out successfully");
        router.push("/auth/login");
        router.refresh();
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-serif text-2xl md:text-3xl font-semibold tracking-wide transition-colors duration-300",
            isScrolled ? "text-foreground" : "text-white"
          )}
        >
          Serenity Bay
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:opacity-70",
                isScrolled ? "text-foreground" : "text-white",
                pathname === link.href && "border-b-2 border-current pb-1"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className={cn(
                  "flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:opacity-70",
                  isScrolled ? "text-foreground" : "text-white"
                )}>
                  {user.profileImage ? (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-accent/30">
                      <img 
                        src={`${user.profileImage}?t=${Date.now()}`} 
                        alt={user.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <UserIcon size={18} />
                  )}
                  <span>{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-md border-white/10">
                <DropdownMenuLabel className="font-serif text-lg">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => router.push("/profile")} className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                  <UserIcon size={16} />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-red-400 hover:bg-red-400/10">
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/login"
              className={cn(
                "font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:opacity-70",
                isScrolled ? "text-foreground" : "text-white",
                pathname === "/auth/login" && "border-b-2 border-current pb-1"
              )}
            >
              Login
            </Link>
          )}
          <Link
            href="/rooms"
            className={cn(
              "font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-6 py-3 transition-all duration-300",
              isScrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            )}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden p-2 transition-colors",
            isScrolled ? "text-foreground" : "text-white"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-background/98 backdrop-blur-lg transition-all duration-500 flex flex-col items-center justify-center gap-8",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 text-foreground"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "font-serif text-3xl font-medium tracking-wide text-foreground transition-all duration-300 hover:text-accent",
              "animate-fade-up opacity-0",
              pathname === link.href && "text-accent"
            )}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            {link.label}
          </Link>
        ))}
        {user ? (
          <>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={cn(
                "font-serif text-3xl font-medium tracking-wide text-foreground transition-all duration-300 hover:text-accent",
                "animate-fade-up opacity-0",
                pathname === "/profile" && "text-accent"
              )}
              style={{ animationDelay: `${navLinks.length * 100}ms`, animationFillMode: 'forwards' }}
            >
              Profile
            </Link>
            <button
              onClick={() => { setIsOpen(false); handleLogout(); }}
              className="font-serif text-3xl font-medium tracking-wide text-red-400 animate-fade-up opacity-0"
              style={{ animationDelay: `${(navLinks.length + 1) * 100}ms`, animationFillMode: 'forwards' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            onClick={() => setIsOpen(false)}
            className={cn(
              "font-serif text-3xl font-medium tracking-wide text-foreground transition-all duration-300 hover:text-accent",
              "animate-fade-up opacity-0",
              pathname === "/auth/login" && "text-accent"
            )}
            style={{ animationDelay: `${navLinks.length * 100}ms`, animationFillMode: 'forwards' }}
          >
            Login
          </Link>
        )}
        <Link
          href="/rooms"
          onClick={() => setIsOpen(false)}
          className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wider uppercase px-8 py-4 bg-primary text-primary-foreground mt-4 animate-fade-up opacity-0"
          style={{ animationDelay: `${(navLinks.length + 2) * 100}ms`, animationFillMode: 'forwards' }}
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
