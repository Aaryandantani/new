import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getAuthToken, verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

// Helper function to robustly handle legacy buffer-based userIds
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

export async function GET() {
  try {
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
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("GET Profile - User found:", {
      id: user._id,
      name: user.name,
      hasImage: !!user.profileImage,
      imageUrl: user.profileImage
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = getNormalizedUserId(payload.userId);
    const { card } = await req.json();
    
    await connectDB();
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { cards: card } },
      { new: true }
    ).select("-password");

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("POST /api/user/profile error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = getNormalizedUserId(payload.userId);
    const { name, email, profileImage } = await req.json();
    
    await connectDB();
    
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profileImage) {
      // If profileImage is a base64 string, upload it to Cloudinary
      if (profileImage.startsWith("data:image")) {
        console.log("Uploading to Cloudinary...");
        const uploadResponse = await cloudinary.uploader.upload(profileImage, {
          folder: "serenity-bay/profiles",
        });
        console.log("Cloudinary Upload Success:", uploadResponse.secure_url);
        updateData.profileImage = uploadResponse.secure_url;
      } else {
        updateData.profileImage = profileImage;
      }
    }

    console.log("Updating user in DB with data:", updateData);
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!user) {
      console.error("User not found during update:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User updated successfully:", user._id);
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("PATCH /api/user/profile error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
