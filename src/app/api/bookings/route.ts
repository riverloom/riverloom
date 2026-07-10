import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const triggerEvent = payload.triggerEvent || "";
    const booking = payload.payload || payload;

    if (!triggerEvent.includes("BOOKING_CREATED") && !booking.title) {
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

    const resend = getResend();
    if (resend) {
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
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
