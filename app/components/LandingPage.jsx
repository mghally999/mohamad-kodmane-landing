"use client";

import Image from "next/image";
import styles from "./LandingPage.module.css";
import ConsultationForm from "./ConsultationForm";
import SocialLinks from "./SocialLinks";
import YouTubeInsights from "./YouTubeInsights";
import { useLanguage } from "./LanguageProvider";

export default function LandingPage() {
  const { locale, isRTL, setLocale } = useLanguage();

  const combinedFollowers = "11,353+";

  const t = {
    en: {
      name: "Mohamad Kodmani",
      title: "CEO & Founder • Mohamad Kodmani Real Estate Brokers LLC",
      footer: `© ${new Date().getFullYear()} Mohamad Kodmani. All rights reserved.`,
      toggle: "AR",
    },
    ar: {
      name: "محمد قضماني",
      title: "الرئيس التنفيذي • محمد قضماني للوساطة العقارية",
      footer: `© ${new Date().getFullYear()} محمد قضماني. جميع الحقوق محفوظة.`,
      toggle: "EN",
    },
  }[locale];

  return (
    <main className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      {/* HERO BANNER */}
      <section className={styles.hero}>
        {/* Banner Image */}
        <div className={styles.banner} />

        {/* Language Toggle (TOP LEFT ON BANNER) */}
        <button
          type="button"
          className={styles.langBtn}
          onClick={() => setLocale(locale === "en" ? "ar" : "en")}
        >
          {t.toggle}
        </button>

        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing}>
            <Image
              src="/mr-mohamad-avatar.jpeg"
              alt={t.name}
              fill
              className={styles.avatar}
              sizes="280px"
              priority
            />
          </div>
        </div>
      </section>

      {/* PROFILE INFO */}
      <section className={styles.profileSection}>
        <h1 className={styles.name}>
          {t.name} <span className={styles.badge}>✓</span>
        </h1>

        <p className={styles.subTitle}>{t.title}</p>

        <SocialLinks />

        <div className={styles.metaRow}>
          <span>★ {combinedFollowers} Followers</span>
          <span className={styles.dot} />
          <span>Dubai, United Arab Emirates</span>
        </div>

        <div className={styles.formCard}>
          <ConsultationForm />
        </div>
      </section>

      <YouTubeInsights />

      <footer className={styles.footer}>{t.footer}</footer>
    </main>
  );
}
