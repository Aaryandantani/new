import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    cards: [
      {
        cardNumber: String,
        cardHolder: String,
        expiry: String,
        isDefault: Boolean,
      },
    ],
    bookings: [
      {
        roomName: String,
        checkIn: Date,
        checkOut: Date,
        totalPrice: Number,
        status: {
          type: String,
          enum: ["confirmed", "completed", "cancelled"],
          default: "confirmed",
        },
        invitedEmails: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
