// /api/contact/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter once (cached between function calls)
let transporter;

function createTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Balanced pooling
      pool: true,
      maxConnections: 3,
      maxMessages: 50,
    });
  }
  return transporter;
}

export async function POST(req) {
  const start = Date.now();

  try {
    const data = await req.json();
    const { fullName, email, phone, unitType, buyTimeline, message } = data;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !unitType ||
      !buyTimeline ||
      !message
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get cached transporter
    const transporter = createTransporter();

    // Verify connection (adds ~0.5s but ensures reliability)
    await transporter.verify();

    // Send both emails in parallel
    await Promise.all([
      // Admin email
      transporter.sendMail({
        from: `"Mohamad Kodmani" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Consultation Request - ${unitType}`,
        html: `
          <h3>New Consultation Request</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Unit Type:</strong> ${unitType}</p>
          <p><strong>Timeline:</strong> ${buyTimeline}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      }),
      // Auto-reply
      transporter.sendMail({
        from: `"Mohamad Kodmani" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "We received your consultation request",
        html: `
          <h3>Thank you ${fullName}</h3>
          <p>We received your request and will contact you within 24 hours.</p>
          <p>Best regards,<br>Mohamad Kodmani Team</p>
        `,
      }),
    ]);

    // Calculate elapsed time
    const elapsed = Date.now() - start;
    console.log(`✅ Processed in ${elapsed}ms`);

    // Add small delay if too fast (ensures minimum 1.5s total)
    if (elapsed < 1500) {
      await new Promise((resolve) => setTimeout(resolve, 1500 - elapsed));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error:", error);

    // Calculate elapsed time even for errors
    const elapsed = Date.now() - start;
    if (elapsed < 1500) {
      await new Promise((resolve) => setTimeout(resolve, 1500 - elapsed));
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
