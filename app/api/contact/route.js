import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const required = [
      "fullName",
      "email",
      "phone",
      "unitType",
      "buyTimeline",
      "message",
    ];
    for (const k of required) {
      if (!data[k]) {
        return NextResponse.json(
          { success: false, message: "Missing fields" },
          { status: 400 },
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || "465"),
      secure: String(process.env.EMAIL_SECURE || "true") === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL;

    const subject = `New Consultation Request - ${data.unitType}`;

    const html = `
      <div style="font-family: Arial; max-width: 640px; margin: 0 auto; padding: 20px;">
        <h2 style="margin:0 0 10px;color:#111;">New Consultation Request</h2>
        <div style="padding:14px;border:1px solid #c9a26a;border-radius:12px;background:#fafafa;">
          <p><b>Name:</b> ${escapeHtml(data.fullName)}</p>
          <p><b>Email:</b> ${escapeHtml(data.email)}</p>
          <p><b>Phone:</b> ${escapeHtml(data.phone)}</p>
          <p><b>Unit Type:</b> ${escapeHtml(data.unitType)}</p>
          <p><b>Timeline:</b> ${escapeHtml(data.buyTimeline)}</p>
          <p><b>Message:</b><br/>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
        </div>
        <p style="margin-top:14px;color:#666;font-size:12px;">Submitted from landing page.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Mohamad Kodmani Real Estate" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject,
      html,
      replyTo: data.email,
    });

    // Optional: user auto-reply
    await transporter.sendMail({
      from: `"Mohamad Kodmani Real Estate" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Thank you — we received your request",
      html: `
        <div style="font-family: Arial; max-width: 640px; margin: 0 auto; padding: 20px;">
          <h2 style="margin:0 0 10px;color:#111;">Thank you, ${escapeHtml(data.fullName)}!</h2>
          <p>We received your request and will contact you within 24 hours.</p>
          <p style="color:#666;font-size:12px;margin-top:16px;">This is an automated email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
