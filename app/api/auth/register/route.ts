import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please provide name, email, and password" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate OTP (6 digits)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP
    await Otp.create({
      email,
      code: otpCode,
    });

    // Send Email
    const emailResult = await sendOtpEmail(email, otpCode);
    
    if (!emailResult.success) {
      // In production, you might want to handle this differently
      console.warn("Email failed to send, but user was created. OTP is:", otpCode);
    }

    // Log OTP for development (simulating email)
    console.log(`\n--- [AUTH] OTP for ${email}: ${otpCode} ---\n`);

    return NextResponse.json(
      { 
        message: "User registered successfully. Please verify your OTP.",
        user: { id: user._id, email: user.email } 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during registration" },
      { status: 500 }
    );
  }
}
