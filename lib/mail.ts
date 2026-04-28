import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(email: string, otp: string) {
  const mailOptions = {
    from: `Serenity Bay <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Serenity Bay Verification Code",
    text: `Your Serenity Bay verification code is: ${otp}. This code will expire in 10 minutes.`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #fcf9f4; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; font-family: 'Georgia', serif; letter-spacing: 2px; margin: 0;">SERENITY BAY</h1>
          <p style="color: #7f8c8d; text-transform: uppercase; font-size: 10px; letter-spacing: 4px; margin-top: 5px;">Your Journey to Paradise Begins Here</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center;">
          <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 20px;">Verification Code</h2>
          <p style="color: #576574; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
            To complete your registration and begin your luxury experience, please use the verification code below:
          </p>
          
          <div style="background-color: #fcf9f4; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: bold; color: #1a1a1a; letter-spacing: 8px; margin-bottom: 30px; border: 1px solid #f0e6d2;">
            ${otp}
          </div>
          
          <p style="color: #95a5a6; font-size: 12px;">
            This code will expire in 10 minutes. If you did not request this code, please ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #bdc3c7; font-size: 11px;">
          <p>&copy; ${new Date().getFullYear()} Serenity Bay Luxury Resort & Spa. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function sendReservationEmail(
  toEmails: string[],
  bookingData: {
    userName: string;
    roomName: string;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
    status: "confirmed" | "updated" | "cancelled";
    isInvited?: boolean;
  }
) {
  const { userName, roomName, checkIn, checkOut, totalPrice, status, isInvited } = bookingData;
  const formatDate = (date: Date) => date.toLocaleDateString("en-US", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Room Image Map
  const roomImages: Record<string, string> = {
    "ocean-suite": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
    "overwater-villa": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    "garden-suite": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "presidential": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "default": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
  };

  const roomSlug = roomName.toLowerCase().replace(/\s+/g, '-');
  const roomImageUrl = roomImages[roomSlug] || roomImages.default;

  let subject = "";
  let title = "";
  let message = "";

  if (status === "confirmed") {
    subject = isInvited ? `${userName} invited you to Serenity Bay!` : "Your Serenity Bay Reservation Confirmed";
    title = isInvited ? "Greetings from Paradise," : `Dear ${userName},`;
    message = isInvited 
      ? `Your friend <strong>${userName}</strong> has invited you to join them for a luxurious escape at Serenity Bay.`
      : `It is with great pleasure that we confirm your upcoming reservation at Serenity Bay.`;
  } else if (status === "updated") {
    subject = "Serenity Bay Reservation Updated";
    title = "Reservation Update,";
    message = `We are writing to inform you that your reservation at Serenity Bay has been updated by <strong>${userName}</strong>.`;
  } else if (status === "cancelled") {
    subject = "Serenity Bay Reservation Cancelled";
    title = "Reservation Cancellation,";
    message = `This email is to confirm that the reservation at Serenity Bay has been cancelled by <strong>${userName}</strong>. We hope to welcome you back in the future.`;
  }

  const mailOptions = {
    from: `Serenity Bay <${process.env.SMTP_USER}>`,
    replyTo: process.env.SMTP_USER,
    to: toEmails.join(", "),
    subject: subject,
    text: `${title}\n\n${message.replace(/<[^>]*>/g, '')}\n\nReservation Details:\nAccommodation: ${roomName}\nArrival: ${formatDate(new Date(checkIn))}\nDeparture: ${formatDate(new Date(checkOut))}\n\nWe look forward to welcoming you to our sanctuary.`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #fcf9f4; color: #1a1a1a;">
        <!-- Header Image -->
        <div style="width: 100%; height: 300px; overflow: hidden; position: relative;">
          <img src="${roomImageUrl}" alt="Your Stay" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; bottom: 20px; left: 20px; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
            <h1 style="letter-spacing: 4px; margin: 0; font-weight: 300; font-size: 28px;">SERENITY BAY</h1>
          </div>
        </div>

        <div style="padding: 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 4px; color: #a1824a; margin: 0;">Private Island Resort & Spa</p>
          </div>

          <div style="margin-bottom: 40px;">
            <h2 style="font-weight: 300; font-style: italic; font-size: 24px; margin-bottom: 20px;">
              ${title}
            </h2>
            <p style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.8; color: #4a4a4a;">
              ${message}
            </p>
          </div>

          <!-- Package Section -->
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #f0e6d2; margin-bottom: 30px;">
            <h3 style="text-transform: uppercase; font-size: 12px; letter-spacing: 2px; color: #a1824a; margin-top: 0; border-bottom: 1px solid #f0e6d2; padding-bottom: 10px; margin-bottom: 20px;">Your Serenity Package</h3>
            
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #555;">
              <div style="flex: 1; min-width: 120px; padding: 10px; background: #fcf9f4; border-radius: 4px; text-align: center;">
                <strong style="display: block; color: #a1824a; margin-bottom: 5px;">Dining</strong>
                Full Board (B/L/D)
              </div>
              <div style="flex: 1; min-width: 120px; padding: 10px; background: #fcf9f4; border-radius: 4px; text-align: center;">
                <strong style="display: block; color: #a1824a; margin-bottom: 5px;">Transfer</strong>
                VIP Seaplane
              </div>
              <div style="flex: 1; min-width: 120px; padding: 10px; background: #fcf9f4; border-radius: 4px; text-align: center;">
                <strong style="display: block; color: #a1824a; margin-bottom: 5px;">Service</strong>
                24/7 Butler
              </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #888;">Accommodation</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 600;">${roomName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Arrival</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 600;">${formatDate(new Date(checkIn))}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Departure</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 600;">${formatDate(new Date(checkOut))}</td>
              </tr>
              ${status !== "cancelled" ? `
              <tr>
                <td style="padding: 10px 0; color: #888;">Package Status</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #a1824a; text-transform: uppercase;">${status}</td>
              </tr>
              ` : ""}
            </table>
          </div>

          <!-- Dining Highlight -->
          <div style="margin-bottom: 40px; border: 1px solid #e5e5e5; overflow: hidden; border-radius: 8px;">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" alt="Dining" style="width: 100%; height: 150px; object-fit: cover;">
            <div style="padding: 20px; background: #ffffff;">
              <h4 style="margin: 0 0 10px 0; color: #a1824a; font-size: 16px;">Culinary Excellence</h4>
              <p style="margin: 0; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #666; line-height: 1.6;">
                Your package includes daily gourmet breakfast at Azure, set-menu lunch at The Sandbank, and a nightly 5-course dinner at our signature underwater restaurant, L'Océan.
              </p>
            </div>
          </div>

          <div style="text-align: center; border-top: 1px solid #e5e5e5; padding-top: 40px; font-family: 'Segoe UI', Arial, sans-serif;">
            <p style="font-size: 14px; color: #4a4a4a; font-style: italic;">
              ${status === "cancelled" 
                ? "We regret that you won't be joining us this time." 
                : '"The ocean stirs the heart, inspires the imagination and brings eternal joy to the soul."'
              }
            </p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              ${status === "cancelled" 
                ? "We hope to welcome you back to paradise soon." 
                : "We look forward to welcoming you to our sanctuary."
              }
            </p>
          </div>
        </div>
      </div>
    `,
    headers: {
      "List-Unsubscribe": `<mailto:${process.env.SMTP_USER}?subject=unsubscribe>`,
      "X-Entity-Ref-ID": `${Date.now()}-${userName.replace(/\s+/g, '')}`,
    }
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending reservation email:", error);
    return { success: false, error };
  }
}
