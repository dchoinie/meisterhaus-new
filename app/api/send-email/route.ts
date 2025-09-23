import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "../../../lib/rate-limit";

// Initialize Resend with better error handling
const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not defined in environment variables");
}
const resend = new Resend(RESEND_API_KEY);

// Create a limiter: 5 requests per IP per minute
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per interval
});

// reCAPTCHA secret key
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "";

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  // If no token is provided and we're in development, allow it
  if (!token && process.env.NODE_ENV !== "production") {
    console.warn("No reCAPTCHA token provided in development mode");
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    // You can adjust the threshold based on your needs (0.0 to 1.0)
    // Higher threshold = stricter filtering
    const threshold = 0.5;

    return data.success && data.score >= threshold;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    // In development, allow submissions even if verification fails
    return process.env.NODE_ENV !== "production";
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";

    // Apply rate limiting
    try {
      await limiter.check(5, ip); // 5 requests per minute per IP
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    console.log("Received booking request:", {
      name: body.fullName,
      email: body.email,
      room: body.room,
      dates: `${body.checkInDate} to ${body.checkOutDate}`,
    });

    // Honeypot check on server side as well
    if (body.website && body.website.length > 0) {
      // Silently reject but return success to avoid tipping off bots
      return NextResponse.json({ success: true });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token with improved error handling
    if (body.recaptchaToken || process.env.NODE_ENV === "production") {
      const isHuman = await verifyRecaptcha(body.recaptchaToken);
      if (!isHuman) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    // Make sure we have a valid API key
    if (!RESEND_API_KEY) {
      console.error("Cannot send email: RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Email service is not configured properly" },
        { status: 500 }
      );
    }

    // Define your sender domain - this must be verified in Resend
    const fromEmail = process.env.EMAIL_FROM || "booking@yourdomain.com";
    const toEmail = process.env.EMAIL_TO || "your-email@example.com";

    console.log(`Attempting to send email from ${fromEmail} to ${toEmail}`);

    try {
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: `Meisterhaus Booking <${fromEmail}>`,
        to: [toEmail], // Your hotel's email
        subject: "New Booking Request",
        text: `
          New booking request from ${body.fullName}
          Email: ${body.email}
          Phone: ${body.phone}
          Room: ${body.room}
          Check-in: ${body.checkInDate}
          Check-out: ${body.checkOutDate}
          Guests: ${body.numberOfGuests} adults, ${body.numberOfChildren} children
        `,
        // You can also use HTML for a nicer email
        html: `
          <h1>New Booking Request</h1>
          <p><strong>Name:</strong> ${body.fullName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Room:</strong> ${body.room}</p>
          <p><strong>Check-in:</strong> ${body.checkInDate}</p>
          <p><strong>Check-out:</strong> ${body.checkOutDate}</p>
          <p><strong>Guests:</strong> ${body.numberOfGuests} adults, ${body.numberOfChildren} children</p>
        `,
        // Add these Resend anti-spam features
        headers: {
          "X-Entity-Ref-ID": `booking-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`, // Prevent duplicate emails
        },
      });

      if (error) {
        console.error("Resend API error:", error);
        return NextResponse.json(
          { error: `Failed to send email: ${error.message}` },
          { status: 500 }
        );
      }

      console.log("Email sent successfully to hotel:", data?.id);

      // Send confirmation email to the guest
      try {
        const confirmationResult = await resend.emails.send({
          from: `Meisterhaus Booking <${fromEmail}>`,
          to: [body.email],
          subject: "Your Booking Request at Meisterhaus",
          text: `
            Dear ${body.fullName},
            
            Thank you for your booking request. We have received your request and will review it shortly.
            
            Booking Details:
            Room: ${body.room}
            Check-in: ${body.checkInDate}
            Check-out: ${body.checkOutDate}
            Guests: ${body.numberOfGuests} adults, ${body.numberOfChildren} children
            
            We will contact you soon to confirm your reservation.
            
            Best regards,
            Meisterhaus Team
          `,
          html: `
            <h1>Thank You for Your Booking Request</h1>
            <p>Dear ${body.fullName},</p>
            <p>Thank you for your booking request. We have received your request and will review it shortly.</p>
            <h2>Booking Details:</h2>
            <p><strong>Room:</strong> ${body.room}</p>
            <p><strong>Check-in:</strong> ${body.checkInDate}</p>
            <p><strong>Check-out:</strong> ${body.checkOutDate}</p>
            <p><strong>Guests:</strong> ${body.numberOfGuests} adults, ${body.numberOfChildren} children</p>
            <p>We will contact you soon to confirm your reservation.</p>
            <p>Best regards,<br>Meisterhaus Team</p>
          `,
        });

        if (confirmationResult.error) {
          console.error(
            "Failed to send confirmation email to guest:",
            confirmationResult.error
          );
          // Continue anyway since the main email was sent
        } else {
          console.log(
            "Confirmation email sent to guest:",
            confirmationResult.data?.id
          );
        }
      } catch (confirmError) {
        console.error("Error sending confirmation email:", confirmError);
        // Continue anyway since the main email was sent
      }

      return NextResponse.json({ success: true, id: data?.id });
    } catch (sendError) {
      console.error("Exception during email sending:", sendError);
      return NextResponse.json(
        { error: "Failed to send email due to an unexpected error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
