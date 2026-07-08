import { NextRequest, NextResponse } from "next/server";

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

    // [CONFIGURABLE] Plug in your email service here:
    // e.g. Resend, SendGrid, Nodemailer, or a CRM API.
    //
    // Example with Resend:
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "RiverLoom <contact@riverloom.in>",
    //     to: ["contact@riverloom.in"],
    //     subject: `New enquiry from ${name}`,
    //     text: `Name: ${name}\nEmail: ${email}\nType: ${projectType}\nMessage: ${message}`,
    //   });

    // For now, log the submission (remove in production).
    console.log("[Contact Submission]", { name, email, projectType, message });

    return NextResponse.json(
      { success: true, message: "Thanks for reaching out! We'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
