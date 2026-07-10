import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, message } = body;

    // Validation
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

    // Skip sending if Resend key is still placeholder
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_placeholder")) {
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
    } else {
      console.log("[Contact Submission — email not sent, set RESEND_API_KEY]", {
        name,
        email,
        projectType,
        message,
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
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or email us directly at contact@riverloom.in.",
      },
      { status: 500 }
    );
  }
}
