"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  CreditCard,
  History,
  Settings,
  Plus,
  Trash2,
  Calendar,
  Star,
  ShieldCheck,
  Pencil,
  LogOut,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const tabs = [
  { id: "profile", label: "Details", icon: User },
  { id: "cards", label: "Payment", icon: CreditCard },
  { id: "bookings", label: "Bookings", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (!res.ok) {
          router.push("/auth/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setProfileData({
          name: data.user.name,
          email: data.user.email,
        });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setProfileData({
          name: data.user.name,
          email: data.user.email,
        });
        toast.success("Profile updated successfully");
        // Notify other components (like Navigation)
        window.dispatchEvent(new Event("profileUpdated"));
      } else {
        const error = await res.json();
        throw new Error(error.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setIsUpdating(true);
      try {
        const res = await fetch("/api/user/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileImage: base64Image }),
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setProfileData({
            name: data.user.name,
            email: data.user.email,
          });
          toast.success("Profile image updated");
          // Notify other components (like Navigation)
          window.dispatchEvent(new Event("profileUpdated"));
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsUpdating(false);
      }
    };
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card: { ...newCard, isDefault: (user.cards?.length ?? 0) === 0 },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAddingCard(false);
        setNewCard({ cardNumber: "", cardHolder: "", expiry: "", cvv: "" });
        toast.success("Card added successfully");
      }
    } catch {
      toast.error("Failed to add card");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/reservation/${bookingId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedUser = { ...user };
        const booking = updatedUser.bookings.find((b: any) => b._id.toString() === bookingId.toString());
        if (booking) booking.status = "cancelled";
        setUser(updatedUser);
        setBookingToCancel(null);
        toast.success("Reservation cancelled");
      }
    } catch {
      toast.error("Failed to cancel reservation");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/reservation/${editingBooking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitedEmails: typeof editingBooking.invitedEmails === 'string' 
            ? editingBooking.invitedEmails.split(',').map((e: string) => e.trim()).filter(Boolean)
            : editingBooking.invitedEmails
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const updatedUser = { ...user };
        const index = updatedUser.bookings.findIndex((b: any) => b._id.toString() === editingBooking._id.toString());
        updatedUser.bookings[index] = data.booking;
        setUser(updatedUser);
        setEditingBooking(null);
        toast.success("Booking updated");
      }
    } catch {
      toast.error("Failed to update booking");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  const initials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-subtle-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <main className="container mx-auto px-4 md:px-6 pb-24 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

          {/* ── Sidebar ─────────────────────────────── */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">

            {/* Avatar Card */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
              <div className="relative inline-block mb-5">
                <div className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center mx-auto overflow-hidden">
                  {user.profileImage ? (
                    <img 
                      src={`${user.profileImage}?t=${Date.now()}`} 
                      alt={user.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-3xl font-serif font-semibold text-accent">
                      {initials}
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-7 h-7 bg-accent text-white rounded-full flex items-center justify-center shadow-md hover:bg-accent/90 transition-colors cursor-pointer">
                  <Pencil size={12} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUpdating} />
                </label>
              </div>
              <h1 className="font-serif text-2xl font-semibold text-foreground">
                {user.name}
              </h1>
              <p className="text-muted-foreground text-sm mt-1 font-[family-name:var(--font-montserrat)]">
                {user.email}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-semibold font-[family-name:var(--font-montserrat)] px-3 py-1.5 rounded-full tracking-wider uppercase">
                <Star size={11} className="fill-accent" /> Serenity Member
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Account Overview
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Bookings", value: user.bookings?.length ?? 0 },
                  { label: "Cards", value: user.cards?.length ?? 0 },
                  { label: "Rewards", value: "2,450" },
                  { label: "Tier", value: "Gold" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-secondary rounded-xl p-4"
                  >
                    <p className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="font-serif text-xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Since */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-accent flex-shrink-0" />
                <div>
                  <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground uppercase tracking-widest">
                    Member Since
                  </p>
                  <p className="font-serif text-sm text-foreground font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive-foreground font-[family-name:var(--font-montserrat)] transition-colors"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-secondary p-1 rounded-xl mb-8 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                    activeTab === id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* ─── DETAILS TAB ─── */}
            {activeTab === "profile" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <h2 className="font-serif text-xl font-semibold mb-1">Personal Information</h2>
                  <p className="text-muted-foreground text-sm font-[family-name:var(--font-montserrat)] mb-6">
                    Manage your account details and preferences.
                  </p>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Full Name
                        </Label>
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="bg-secondary border-border h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Email Address
                        </Label>
                        <Input
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="bg-secondary border-border h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Phone Number
                        </Label>
                        <Input
                          placeholder="Add phone number"
                          className="bg-secondary border-border h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Country
                        </Label>
                        <Input
                          placeholder="Add country"
                          className="bg-secondary border-border h-11"
                        />
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={isUpdating}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest px-8 h-11 min-w-[140px]"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <h2 className="font-serif text-xl font-semibold mb-1">Preferences</h2>
                  <p className="text-muted-foreground text-sm font-[family-name:var(--font-montserrat)] mb-6">
                    Customize your stay experience.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Receive booking confirmation emails",
                      "Receive promotional offers",
                      "Newsletter & resort updates",
                    ].map((pref) => (
                      <label
                        key={pref}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-5 h-5 rounded border-2 border-accent bg-accent/10 flex items-center justify-center">
                          <Check size={12} className="text-accent" />
                        </div>
                        <span className="font-[family-name:var(--font-montserrat)] text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                          {pref}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── CARDS TAB ─── */}
            {activeTab === "cards" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">Payment Methods</h2>
                    <p className="text-muted-foreground text-sm font-[family-name:var(--font-montserrat)] mt-1">
                      Manage your saved cards for quick checkout.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsAddingCard(true)}
                    className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-11 px-6"
                  >
                    <Plus size={16} />
                    Add Card
                  </Button>
                </div>

                {isAddingCard && (
                  <div className="bg-card border border-accent/30 rounded-2xl p-8 shadow-sm animate-fade-in">
                    <h3 className="font-serif text-lg font-semibold mb-5">New Payment Method</h3>
                    <form onSubmit={handleAddCard} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Cardholder Name
                        </Label>
                        <Input
                          value={newCard.cardHolder}
                          onChange={(e) =>
                            setNewCard({ ...newCard, cardHolder: e.target.value })
                          }
                          placeholder="John Doe"
                          className="bg-secondary border-border h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Card Number
                        </Label>
                        <Input
                          value={newCard.cardNumber}
                          onChange={(e) =>
                            setNewCard({ ...newCard, cardNumber: e.target.value })
                          }
                          placeholder="1234 5678 9012 3456"
                          className="bg-secondary border-border h-11 font-mono tracking-widest"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                            Expiry Date
                          </Label>
                          <Input
                            value={newCard.expiry}
                            onChange={(e) =>
                              setNewCard({ ...newCard, expiry: e.target.value })
                            }
                            placeholder="MM / YY"
                            className="bg-secondary border-border h-11 font-mono"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                            CVV
                          </Label>
                          <Input
                            value={newCard.cvv}
                            onChange={(e) =>
                              setNewCard({ ...newCard, cvv: e.target.value })
                            }
                            placeholder="•••"
                            type="password"
                            className="bg-secondary border-border h-11 font-mono"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-11"
                        >
                          {isProcessing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Save Card"
                          )}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setIsAddingCard(false)}
                          variant="ghost"
                          className="flex-1 border border-border font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-11"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Card Grid */}
                {user.cards && user.cards.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.cards.map((card: any, index: number) => (
                      <div
                        key={index}
                        className="relative group overflow-hidden h-52 rounded-2xl p-6 flex flex-col justify-between"
                        style={{
                          background:
                            index % 2 === 0
                              ? "linear-gradient(135deg, oklch(0.25 0.04 60), oklch(0.35 0.06 55))"
                              : "linear-gradient(135deg, oklch(0.30 0.06 175), oklch(0.20 0.04 200))",
                        }}
                      >
                        {/* Decorative circles */}
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
                        <div className="absolute -right-2 -top-2 w-24 h-24 rounded-full bg-white/5" />

                        <div className="relative flex justify-between items-start">
                          <div className="w-10 h-7 bg-white/20 rounded-md backdrop-blur-sm" />
                          <span className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-[0.2em] text-white/50">
                            Serenity Bay
                          </span>
                        </div>

                        <div className="relative space-y-3">
                          <p className="font-mono text-lg tracking-[0.2em] text-white">
                            ••••  ••••  ••••  {card.cardNumber.slice(-4)}
                          </p>
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="font-[family-name:var(--font-montserrat)] text-[9px] uppercase tracking-widest text-white/40 mb-0.5">
                                Card Holder
                              </p>
                              <p className="font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-wider text-white font-medium">
                                {card.cardHolder}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-[family-name:var(--font-montserrat)] text-[9px] uppercase tracking-widest text-white/40 mb-0.5">
                                Expires
                              </p>
                              <p className="font-mono text-sm text-white">
                                {card.expiry}
                              </p>
                            </div>
                          </div>
                        </div>

                        {card.isDefault && (
                          <span className="absolute top-4 right-12 font-[family-name:var(--font-montserrat)] text-[9px] uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}

                        <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-400/30 text-white/50 hover:text-red-300">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : !isAddingCard ? (
                  <div className="py-16 flex flex-col items-center justify-center bg-secondary rounded-2xl border border-dashed border-border text-center">
                    <CreditCard size={40} className="text-muted-foreground/30 mb-4" />
                    <p className="font-serif text-xl text-muted-foreground mb-1">
                      No cards saved
                    </p>
                    <p className="text-muted-foreground/60 text-sm font-[family-name:var(--font-montserrat)]">
                      Add a card for a seamless booking experience.
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            {/* ─── BOOKINGS TAB ─── */}
            {activeTab === "bookings" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-2xl font-semibold">Stay History</h2>
                  <p className="text-muted-foreground text-sm font-[family-name:var(--font-montserrat)] mt-1">
                    Your past and upcoming reservations at Serenity Bay.
                  </p>
                </div>

                {editingBooking ? (
                  <div className="bg-card border border-accent/30 rounded-2xl p-8 shadow-sm animate-fade-in">
                    <h3 className="font-serif text-lg font-semibold mb-5">Edit Reservation</h3>
                    <form onSubmit={handleUpdateBooking} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Room
                        </Label>
                        <Input value={editingBooking.roomName} disabled className="bg-secondary/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-muted-foreground">
                          Invited Friends (comma separated)
                        </Label>
                        <Input
                          value={Array.isArray(editingBooking.invitedEmails) ? editingBooking.invitedEmails.join(', ') : editingBooking.invitedEmails}
                          onChange={(e) => setEditingBooking({ ...editingBooking, invitedEmails: e.target.value })}
                          placeholder="friend1@example.com, friend2@example.com"
                          className="bg-secondary border-border h-11"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-11"
                        >
                          {isProcessing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Save Updates"
                          )}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setEditingBooking(null)}
                          variant="ghost"
                          className="flex-1 border border-border font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-11"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : user.bookings && user.bookings.length > 0 ? (
                  <div className="space-y-4">
                    {user.bookings.map((booking: any, index: number) => (
                      <div
                        key={index}
                        className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                            <Calendar size={26} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-serif text-lg font-semibold">{booking.roomName}</h4>
                              <span
                                className={`font-[family-name:var(--font-montserrat)] text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-semibold ${
                                  booking.status === "confirmed"
                                    ? "bg-accent/10 text-accent"
                                    : booking.status === "completed"
                                    ? "bg-secondary text-muted-foreground"
                                    : "bg-destructive/10 text-destructive-foreground"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </div>
                            <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground mt-0.5">
                              {new Date(booking.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              {" — "}
                              {new Date(booking.checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                            {booking.invitedEmails?.length > 0 && (
                              <p className="text-[10px] text-muted-foreground/60 mt-1 font-[family-name:var(--font-montserrat)]">
                                Invited: {booking.invitedEmails.join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          <p className="font-serif text-xl font-semibold text-foreground">
                            ${booking.totalPrice.toLocaleString()}
                          </p>
                          {booking.status === "confirmed" && (
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => setEditingBooking(booking)}
                                className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                                title="Edit Friends"
                              >
                                <Pencil size={14} />
                              </button>
                              <button 
                                onClick={() => setBookingToCancel(booking._id)}
                                className="p-2 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive-foreground transition-colors"
                                title="Cancel Reservation"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center justify-center bg-secondary rounded-2xl border border-dashed border-border text-center">
                    <History size={40} className="text-muted-foreground/30 mb-4" />
                    <p className="font-serif text-xl text-muted-foreground mb-1">
                      No bookings yet
                    </p>
                    <p className="text-muted-foreground/60 text-sm font-[family-name:var(--font-montserrat)] mb-6">
                      Your stay history will appear here.
                    </p>
                    <Button
                      onClick={() => router.push("/rooms")}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest px-8 h-11"
                    >
                      Explore Rooms
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* ─── SETTINGS TAB ─── */}
            {activeTab === "settings" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-2xl font-semibold">Account Settings</h2>
                  <p className="text-muted-foreground text-sm font-[family-name:var(--font-montserrat)] mt-1">
                    Manage your security and account preferences.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-2xl shadow-sm divide-y divide-border">
                  {[
                    {
                      title: "Password",
                      description: "Update your password regularly to keep your account secure.",
                      action: "Change Password",
                      destructive: false,
                    },
                    {
                      title: "Two-Factor Authentication",
                      description: "Add an extra layer of security to your account.",
                      action: "Enable 2FA",
                      destructive: false,
                    },
                    {
                      title: "Login Sessions",
                      description: "Review all devices that are logged into your account.",
                      action: "View Sessions",
                      destructive: false,
                    },
                    {
                      title: "Delete Account",
                      description: "Permanently remove your account and all associated data.",
                      action: "Delete Account",
                      destructive: true,
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-6"
                    >
                      <div>
                        <p
                          className={`font-[family-name:var(--font-montserrat)] font-semibold text-sm ${
                            item.destructive ? "text-destructive-foreground" : "text-foreground"
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="text-muted-foreground text-sm mt-0.5 font-[family-name:var(--font-montserrat)]">
                          {item.description}
                        </p>
                      </div>
                      <Button
                        variant={item.destructive ? "ghost" : "ghost"}
                        className={`flex-shrink-0 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-10 px-5 border transition-colors ${
                          item.destructive
                            ? "border-destructive/30 text-destructive-foreground hover:bg-destructive/10"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {item.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <AlertDialog open={!!bookingToCancel} onOpenChange={(open) => !open && setBookingToCancel(null)}>
        <AlertDialogContent className="bg-card border-border max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl font-semibold">Cancel Reservation?</AlertDialogTitle>
            <AlertDialogDescription className="font-[family-name:var(--font-montserrat)] text-muted-foreground">
              This action will cancel your stay at Serenity Bay. An automated notification will be sent to you and any invited friends. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex gap-3">
            <AlertDialogCancel className="flex-1 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-11 border-border">
              Keep Booking
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                bookingToCancel && handleCancelBooking(bookingToCancel);
              }}
              disabled={isProcessing}
              className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest h-11"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Cancel Stay"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
