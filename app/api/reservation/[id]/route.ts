import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getAuthToken, verifyToken } from "@/lib/auth";
import { sendReservationEmail } from "@/lib/mail";

// Helper function to normalize userId
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = getNormalizedUserId(payload.userId);
    const updateData = await req.json();

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("PATCH Booking - Searching for ID:", id);
    console.log("User bookings IDs:", user.bookings.map((b: any) => b._id.toString()));

    const bookingIndex = user.bookings.findIndex((b: any) => b._id.toString() === id);
    if (bookingIndex === -1) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update booking data
    if (updateData.status) {
      user.bookings[bookingIndex].status = updateData.status;
    }
    if (updateData.checkIn) {
      user.bookings[bookingIndex].checkIn = new Date(updateData.checkIn);
    }
    if (updateData.checkOut) {
      user.bookings[bookingIndex].checkOut = new Date(updateData.checkOut);
    }
    if (updateData.roomName) {
      user.bookings[bookingIndex].roomName = updateData.roomName;
    }
    if (updateData.invitedEmails) {
      user.bookings[bookingIndex].invitedEmails = updateData.invitedEmails;
    }

    await user.save();

    // Send update emails
    const booking = user.bookings[bookingIndex];
    const emails = [user.email, ...(booking.invitedEmails || [])];
    await sendReservationEmail(emails, {
      userName: user.name,
      roomName: booking.roomName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      totalPrice: booking.totalPrice,
      status: "updated",
      isInvited: false // This is an update notification
    });

    return NextResponse.json({ 
      message: "Booking updated successfully", 
      booking: user.bookings[bookingIndex] 
    });

  } catch (error: any) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = getNormalizedUserId(payload.userId);

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("DELETE Booking - Searching for ID:", id);
    console.log("User bookings IDs:", user.bookings.map((b: any) => b._id.toString()));

    // Instead of deleting, we usually just mark as cancelled
    const bookingIndex = user.bookings.findIndex((b: any) => b._id.toString() === id);
    if (bookingIndex === -1) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    user.bookings[bookingIndex].status = "cancelled";
    await user.save();

    // Send cancellation email
    const booking = user.bookings[bookingIndex];
    const emails = [user.email, ...(booking.invitedEmails || [])];
    await sendReservationEmail(emails, {
      userName: user.name,
      roomName: booking.roomName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      totalPrice: booking.totalPrice,
      status: "cancelled",
      isInvited: false
    });

    return NextResponse.json({ message: "Booking cancelled successfully" });

  } catch (error: any) {
    console.error("Cancel booking error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
