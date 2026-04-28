import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getAuthToken, verifyToken } from "@/lib/auth";
import { sendReservationEmail } from "@/lib/mail";

// Helper function to normalize userId (copied from profile route)
function getNormalizedUserId(userId: any): string {
  if (typeof userId === 'object' && userId !== null) {
    const userIdAny = userId as any;
    if (userIdAny.buffer) {
      const bytes = [];
      for (let i = 0; i < 12; i++) {
        const val = userIdAny.buffer[i.toString()];
        if (val !== undefined) bytes.push(val);
      }
      if (bytes.length === 12) {
        return Buffer.from(bytes).toString('hex');
      }
      return Buffer.from(Object.values(userIdAny.buffer)).toString('hex');
    }
    return userId.toString();
  }
  return userId;
}

export async function POST(req: Request) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Please log in to make a reservation" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid session. Please log in again." }, { status: 401 });
    }

    const userId = getNormalizedUserId(payload.userId);
    const { roomType, checkIn, checkOut, guests, name, email, phone, message, invitedEmails } = await req.json();

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has at least one card
    if (!user.cards || user.cards.length === 0) {
      return NextResponse.json({ 
        error: "Card required", 
        message: "Please add a card to your profile for token payment before proceeding with the reservation." 
      }, { status: 400 });
    }

    // Mock price calculation (in real app, this would come from room data)
    const totalPrice = roomType === "presidential" ? 2500 : roomType === "overwater-villa" ? 1500 : 800;

    // Add to user's bookings
    const newBooking = {
      roomName: roomType || "Standard Suite",
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalPrice: totalPrice,
      status: "confirmed",
      invitedEmails: invitedEmails || []
    };

    user.bookings.push(newBooking);
    await user.save();

    // Send emails
    // 1. To the user
    await sendReservationEmail([user.email], {
      userName: user.name,
      roomName: newBooking.roomName,
      checkIn: newBooking.checkIn,
      checkOut: newBooking.checkOut,
      totalPrice: newBooking.totalPrice,
      status: "confirmed"
    });

    // 2. To invited friends
    if (invitedEmails && invitedEmails.length > 0) {
      await sendReservationEmail(invitedEmails, {
        userName: user.name,
        roomName: newBooking.roomName,
        checkIn: newBooking.checkIn,
        checkOut: newBooking.checkOut,
        totalPrice: newBooking.totalPrice,
        status: "confirmed",
        isInvited: true
      });
    }

    return NextResponse.json({ 
      message: "Reservation successful", 
      booking: newBooking 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Reservation error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
