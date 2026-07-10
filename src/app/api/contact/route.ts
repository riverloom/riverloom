import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (!projectType || typeof projectType !== "string") {
      return NextResponse.json(
        { error: "Please select a project type." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "contact@riverloom.in";

    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: `RiverLoom Website <onboarding@resend.dev>`,
        to: [contactEmail],
        subject: `New enquiry from ${name} — ${projectType}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Project Type: ${projectType}`,
          `Message:\n${message}`,
        ].join("\n\n"),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thanks for reaching out! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or email us directly at contact@riverloom.in.",
      },
      { status: 500 }
    );
  }
}
