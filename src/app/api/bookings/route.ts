import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

/**
 * Cal.com webhook endpoint.
 *
 * After deploying, add this URL to your Cal.com event type webhook:
 *   https://your-domain.com/api/bookings
 *
 * Cal.com sends POST requests with JSON payload when a booking is created.
 */

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Extract booking details from Cal.com webhook payload
    // Structure varies by Cal.com version — handle both v1 and v2 shapes
    const triggerEvent = payload.triggerEvent || "";
    const booking = payload.payload || payload;

    // Only act on created bookings (ignore reschedules/cancellations)
    if (!triggerEvent.includes("BOOKING_CREATED") && !booking.title) {
      // If we can't determine the event and there's no booking data, skip
      return NextResponse.json({ received: true });
    }

    const attendeeName =
      booking.attendees?.[0]?.name ||
      booking.attendee?.name ||
      booking.responses?.name?.value ||
      booking.name ||
      "Unknown";

    const attendeeEmail =
      booking.attendees?.[0]?.email ||
      booking.attendee?.email ||
      booking.responses?.email?.value ||
      booking.email ||
      "unknown@example.com";

    const startTime = booking.startTime || booking.start || "";
    const endTime = booking.endTime || booking.end || "";
    const eventTitle = booking.title || booking.eventType?.title || "Consultation";

    const contactEmail = process.env.CONTACT_EMAIL || "contact@riverloom.in";

    if (
      process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.startsWith("re_placeholder")
    ) {
      await resend.emails.send({
        from: `RiverLoom Bookings <onboarding@resend.dev>`,
        to: [contactEmail],
        subject: `New Booking: ${eventTitle} — ${attendeeName}`,
        text: [
          `New consultation booked via Cal.com`,
          ``,
          `Event: ${eventTitle}`,
          `Name: ${attendeeName}`,
          `Email: ${attendeeEmail}`,
          `Start: ${startTime}`,
          `End: ${endTime}`,
        ].join("\n"),
      });
    } else {
      console.log("[Booking Webhook — email not sent, set RESEND_API_KEY]", {
        attendeeName,
        attendeeEmail,
        eventTitle,
        startTime,
        endTime,
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("[Booking Webhook Error]", err);
    // Return 200 so Cal.com doesn't retry on transient errors
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
