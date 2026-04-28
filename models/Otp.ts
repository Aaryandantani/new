import mongoose, { Schema, model, models } from "mongoose";

const OtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // OTP expires after 10 minutes (600 seconds)
    },
  },
  {
    timestamps: true,
  }
);

// Add index for faster queries
OtpSchema.index({ email: 1 });

const Otp = models.Otp || model("Otp", OtpSchema);

export default Otp;
