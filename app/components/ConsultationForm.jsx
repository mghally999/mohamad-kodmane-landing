"use client";

import { useState } from "react";
import styles from "./ConsultationForm.module.css";

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
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      unitType: form.get("unitType"),
      buyTimeline: form.get("buyTimeline"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        e.currentTarget.reset();
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <div className={styles.successTitle}>Thank You!</div>
        <div className={styles.successMessage}>
          We have received your request and will contact you within 24 hours.
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className={styles.submitAnother}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={styles.formWrap}>
      {/* HEADER */}
      <div className={styles.head}>
        <div className={styles.headTitle}>Book your consultation now</div>
        <div className={styles.headTitleAr}>احجز استشارتك الآن</div>
      </div>

      <div className={styles.divider} />

      {/* FULL NAME */}
      <label className={styles.label}>
        Your Full Name | الاسم الكامل <span className={styles.req}>*</span>
      </label>
      <input name="fullName" required className={styles.input} />

      {/* EMAIL */}
      <label className={styles.label}>
        Email | بريدك الإلكتروني <span className={styles.req}>*</span>
      </label>
      <input name="email" type="email" required className={styles.input} />

      {/* PHONE */}
      <label className={styles.label}>
        Phone Number | رقم موبايلك <span className={styles.req}>*</span>
      </label>
      <input name="phone" required className={styles.input} />

      {/* UNIT TYPE - with left arrow */}
      <label className={styles.label}>
        Unit type you're looking to buy? | نوع الوحدة التي تريد شرائها{" "}
        <span className={styles.req}>*</span>
      </label>
      <div className={styles.selectWrapper}>
        <select name="unitType" required className={styles.select}>
          <option value="">Select</option>
          {UNIT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <span className={styles.selectArrow}>◀</span>
      </div>

      {/* TIMELINE - with left arrow */}
      <label className={styles.label}>
        When are you planning to buy? | متى تخطط للشراء{" "}
        <span className={styles.req}>*</span>
      </label>
      <div className={styles.selectWrapper}>
        <select name="buyTimeline" required className={styles.select}>
          <option value="">Select</option>
          {BUY_TIMELINE.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <span className={styles.selectArrow}>◀</span>
      </div>

      {/* MESSAGE */}
      <label className={styles.label}>
        Your Message | رسالتك <span className={styles.req}>*</span>
      </label>
      <textarea name="message" required rows={5} className={styles.textarea} />

      <div className={styles.note}>
        We assure that your data will be protected.
      </div>

      {/* BUTTON */}
      <button type="submit" disabled={loading} className={styles.submit}>
        {loading ? "SUBMITTING..." : "SUBMIT"}
      </button>
    </form>
  );
}
