"use client";

import { useState } from "react";

const UNIT_TYPES = [
  "Apartment",
  "Townhouse",
  "Penthouse",
  "Villa",
  "Mansion",
  "Plot",
];
const BUY_TIMELINE = [
  "I'm ready to buy",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
];

export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setOk(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setOk(data.success ? "success" : "error");
      if (data.success) e.currentTarget.reset();
    } catch {
      setOk("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ padding: 22, textAlign: "left" }}>
      <div style={{ textAlign: "center", paddingBottom: 14 }}>
        <div style={{ fontSize: 28, fontWeight: 800 }}>
          Book your consultation now
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 22,
            fontWeight: 800,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          احجز استشارتك الآن
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "rgba(201,162,106,0.25)",
          margin: "10px 0 18px",
        }}
      />

      {/* Full Name */}
      <label style={labelStyle}>
        Your Full Name | الاسم الكامل <span style={reqStyle}>*</span>
      </label>
      <input
        name="fullName"
        required
        placeholder="Your name"
        style={inputStyle}
      />

      {/* Email */}
      <label style={labelStyle}>
        Email | بريدك الإلكتروني <span style={reqStyle}>*</span>
      </label>
      <input
        name="email"
        type="email"
        required
        placeholder="name@email.com"
        style={inputStyle}
      />

      {/* Phone */}
      <label style={labelStyle}>
        Phone Number | رقم موبايلك <span style={reqStyle}>*</span>
      </label>
      <input
        name="phone"
        required
        placeholder="+971 55 123 4567"
        style={inputStyle}
      />

      {/* Unit Type */}
      <label style={labelStyle}>
        Unit type you're looking to buy? | نوع الوحدة التي تريد شرائها{" "}
        <span style={reqStyle}>*</span>
      </label>
      <select name="unitType" required style={selectStyle}>
        <option value="">— اختر | Select —</option>
        {UNIT_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Timeline */}
      <label style={labelStyle}>
        When are you planning to buy? | متى تخطط للشراء{" "}
        <span style={reqStyle}>*</span>
      </label>
      <select name="buyTimeline" required style={selectStyle}>
        <option value="">— اختر | Select —</option>
        {BUY_TIMELINE.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Message */}
      <label style={labelStyle}>
        Your Message | رسالتك <span style={reqStyle}>*</span>
      </label>
      <textarea
        name="message"
        required
        placeholder="Your message here"
        rows={5}
        style={textareaStyle}
      />

      <div
        style={{ marginTop: 10, color: "rgba(255,255,255,0.55)", fontSize: 13 }}
      >
        We assure that your data will be protected.
      </div>

      <button type="submit" disabled={loading} style={submitStyle}>
        {loading ? "SUBMITTING..." : "SUBMIT"}
      </button>

      {ok === "success" && (
        <div style={{ marginTop: 12, color: "#7CFFB5", fontWeight: 700 }}>
          ✅ Thank you! We will contact you within 24 hours.
        </div>
      )}
      {ok === "error" && (
        <div style={{ marginTop: 12, color: "#FF7C7C", fontWeight: 700 }}>
          ❌ Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}

const labelStyle = {
  display: "block",
  marginTop: 14,
  marginBottom: 8,
  color: "rgba(255,255,255,0.85)",
  fontSize: 14,
  fontWeight: 700,
};

const reqStyle = { color: "#ff5a5a" };

const inputStyle = {
  width: "100%",
  padding: "16px 16px",
  borderRadius: 14,
  background: "rgba(0,0,0,0.25)",
  border: "1px solid rgba(201,162,106,0.35)",
  color: "white",
  outline: "none",
};

const selectStyle = { ...inputStyle, cursor: "pointer" };

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: 120,
};

const submitStyle = {
  width: "100%",
  marginTop: 18,
  padding: "16px 18px",
  borderRadius: 14,
  border: "none",
  cursor: "pointer",
  fontWeight: 900,
  letterSpacing: "0.5px",
  color: "#0b0b0b",
  background: "linear-gradient(180deg, #d9b67a, #a27b43)",
};
