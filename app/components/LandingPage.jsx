"use client";

import Image from "next/image";
import styles from "./LandingPage.module.css";
import ConsultationForm from "./ConsultationForm";
import SocialLinks from "./SocialLinks";
import YouTubeInsights from "./YouTubeInsights";
import { useLanguage } from "./LanguageProvider";

export default function LandingPage() {
  const { locale, isRTL, setLocale } = useLanguage();

  // From your screenshots:
  // IG 1,926 + YouTube 9,200 (9.2K) + FB 227 = 11,353
  const combinedFollowers = "11,353+";

  const t = {
    en: {
      name: "Mohamad Kodmani",
      title: "Luxury Real Estate Consultant • Dubai, UAE",
      book: "Book your consultation now",
      bookAr: "احجز استشارتك الآن",
      footer: `© ${new Date().getFullYear()} Mohamad Kodmani. All rights reserved.`,
      toggle: "AR",
    },
    ar: {
      name: "محمد قضماني",
      title: "مستشار عقارات فاخرة • دبي، الإمارات",
      book: "احجز استشارتك الآن",
      bookAr: "Book your consultation now",
      footer: `© ${new Date().getFullYear()} محمد قضماني. جميع الحقوق محفوظة.`,
      toggle: "EN",
    },
  }[locale];

  return (
    <main className={styles.page}>
      <div className={styles.heroBg} aria-hidden="true" />

      <header className={styles.topBar}>
        <div className={styles.brand}>mohamadkodmani.ae</div>

        <button
          type="button"
          className={styles.langBtn}
          onClick={() => setLocale(locale === "en" ? "ar" : "en")}
          aria-label="Toggle language"
        >
          {t.toggle}
        </button>
      </header>

      <section className={styles.hero}>
        <div className={styles.profileWrap}>
          <div className={styles.profileRing}>
            <div className={styles.profileInner}>
              <Image
                src="/mr-mohamad-avatar.jpeg"
                alt={t.name}
                fill
                sizes="220px"
                className={styles.profileImg}
                priority
              />
            </div>
          </div>
        </div>

        <h1 className={styles.name}>{t.name}</h1>
        <p className={styles.subTitle}>{t.title}</p>

        <SocialLinks />

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            ★ {combinedFollowers} Followers
          </span>
          <span className={styles.dot} />
          <span className={styles.metaItem}>Dubai, United Arab Emirates</span>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHead}>
            <div className={styles.formTitle}>{t.book}</div>
            <div className={styles.formTitleAr}>{t.bookAr}</div>
          </div>

          <ConsultationForm />

          <div className={styles.formNote}>
            {isRTL
              ? "نؤكد أن بياناتك ستكون محمية."
              : "We assure that your data will be protected."}
          </div>
        </div>
      </section>

      <YouTubeInsights />

      <footer className={styles.footer}>{t.footer}</footer>
    </main>
  );
}
